import React, { useState, useEffect } from "react";
import { Alert, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import { EvilIcons } from "@expo/vector-icons";
import api from "../../../api";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

var albumBucketName = "pack-man";
var bucketRegion = "ap-northeast-2";
var IdentityPoolId = "ap-northeast-2:2673b02d-7976-4784-ab48-7e398dd27835";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

export default function TakePhoto({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function sendImage(imageUrl) {
    console.log("imgUrl : " + imageUrl);
    try {
      const { status } = await api.detect({
        url: imageUrl,
      });

      if (status == 201) {
        console.log("전송 완료");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <EvilIcons
        name="close"
        size={30}
        color="black"
        style={{ marginTop: 50, marginBottom: 10, marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      />
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: screenHeight - 300,
            }}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync();
                const file = {
                  uri: photo.uri,
                  name: photo.fileName,
                  type: "image/jpg",
                };

                const response = await fetch(photo.uri);
                const blob = await response.blob();
                let _date = new Date();
                let _today = `${_date.getFullYear()}${
                  _date.getMonth() + 1
                }${_date.getDate()}${_date.getHours()}${_date.getMinutes()}${_date.getSeconds()}`;

                // 업로드 속성 설정
                var params = {
                  Bucket: albumBucketName,
                  Key: `${_today}.jpeg`,
                  Body: blob,
                  ACL: "public-read",
                };

                const temp = api.AWS_S3_SERVER + params.Key;
                console.log("upload url : " + temp);

                // 업로드
                s3.upload(params, function (err) {
                  if (err) {
                    return alert("There was an error uploading your photo");
                  }

                  Alert.alert(
                    "Alert",
                    "Successfully uploaded photo.",
                    [
                      {
                        text: "확인",
                        onPress: () => navigation.navigate("calendar"),
                      },
                    ],
                    { cancelable: true }
                  );

                  sendImage(temp);
                });
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: "50%",
                borderColor: "#03bcdb",
                height: 60,
                width: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: "50%",
                  borderColor: "#03bcdb",
                  height: 50,
                  width: 50,
                  backgroundColor: "#03bcdb",
                }}
              ></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
