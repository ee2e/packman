import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Shot = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border: 10px solid;
  align-self: center;
`;

const TakePhoto = ({ navigation: { navigate } }) => {
  const cameraRef = useRef();
  const [hasAllow, setHasAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  //카메라 권한 요청 함수
  const requestPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasAllow(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const takePhoto = async () => {
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigate("UpLoad", { photo: asset });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      {hasAllow ? (
        <>
          <Camera
            ref={cameraRef}
            style={{
              width: 500,
              height: 500,
              justifyContent: "flex-end"
            }}
            type={cameraType}
          >
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons
                name={
                  Platform.OS === "ios"
                    ? "ios-reverse-camera"
                    : "md-reverse-camera"
                }
                color="white"
                size={28}
                style={{ margin: 10 }}
              />
            </TouchableOpacity>
          </Camera>
          <View>
            <Shot onPress={takePhoto} disabled={!canTakePhoto} />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default TakePhoto;