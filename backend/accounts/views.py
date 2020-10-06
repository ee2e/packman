#카카오
from django.shortcuts import render, redirect

import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser, AllowAny

from .serializers import UserSerializer

from django.contrib.auth import get_user_model

User = get_user_model()

# kakao
import requests


class UsersViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"])
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user is not None:
            encoded_jwt = jwt.encode(
                {"pk": user.pk}, settings.SECRET_KEY, algorithm="HS256"
            )
            return Response(data={"token": encoded_jwt, "id": user.pk})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    # localhost:8000/api/v1/accounts/kakao_logout 
    @action(detail=False, methods=["GET"])
    def kakao_logout(self, request):

        client_id = 'ce1abb66697317af6ce74d35f144bb5c'
        logout_redirect_uri = 'http://localhost:8000/api/v1/accounts/oauth'
        
        logout_request_url = 'https://kauth.kakao.com/oauth/logout?'
        logout_request_url += 'client_id=' + client_id   
        logout_request_url += '&logout_redirect_uri=' + logout_redirect_uri

        logout_request_url_data = requests.get(logout_request_url)
        # json_data = logout_request_url_data.json()
        print(logout_request_url_data)
        return redirect('/api/v1/utilities/index/')


    @action(detail=False, methods=["GET"])
    def oauth(self, request):
        # print('-----------------------------------------------')
        code = request.GET['code']
        print('code='+ str(code))
        # return Response(url)
        # print(url)
        client_id = 'ce1abb66697317af6ce74d35f144bb5c'
        redirect_uri = 'http://127.0.0.1:8000/api/v1/accounts/oauth'

        access_token_request_uri = 'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&'

        access_token_request_uri += '&client_id=' + client_id   
        access_token_request_uri += '&redirect_uri=' + redirect_uri
        access_token_request_uri += '&code=' + code


        access_token_request_uri_data = requests.get(access_token_request_uri)
        json_data = access_token_request_uri_data.json()
        print(json_data)
        access_token = json_data['access_token']
        print(access_token)
        # print(access_token_request_uri)
        ################### 다음 페이지로.
        return 


    # localhost:8000/api/v1/accounts/kakao_login/      로 요청
    @action(detail=False, methods=["GET"])
    def kakao_login(self, request):
        login_request_url = 'https://kauth.kakao.com/oauth/authorize?response_type=code'

        client_id = 'ce1abb66697317af6ce74d35f144bb5c'
        redirect_uri = 'http://127.0.0.1:8000/api/v1/accounts/oauth'

        login_request_url += '&client_id=' + client_id   
        login_request_url += '&redirect_uri=' + redirect_uri

        return redirect(login_request_url)
