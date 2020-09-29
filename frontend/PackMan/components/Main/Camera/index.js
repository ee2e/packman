import React, { useState, useEffect } from "react";
import { Alert, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import AWS from "aws-sdk/dist/aws-sdk-react-native";
import { EvilIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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

  return (
    <View style={{ flex: 1 }}>
      <EvilIcons
        name="close"
        size={30}
        color="black"
        style={{ marginTop: 40, marginBottom: 10, marginLeft: 10 }}
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
            backgroundColor: "white",
            marginTop: windowHeight - 320,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 55,
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

                // 업로드
                s3.upload(params, function (err, data) {
                  if (err) {
                    // console.log(err);
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
                });

                // console.log(params);
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
