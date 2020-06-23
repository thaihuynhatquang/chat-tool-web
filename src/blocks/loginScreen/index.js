import { Button, Icon } from 'antd';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import vars from 'vars';

const responseGoogle = (response) => {
  const accessToken = response.tokenId;
  document.cookie = `access_token=${accessToken}`;
  window.location.reload();
};

export const LoginScreen = () => {
  return (
    <div className='animated fadeIn'>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\n    body .vertical-centered-box {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      text-align: center;\n    }\n\n    body .vertical-centered-box:after {\n      content: '';\n      display: inline-block;\n      height: 100%;\n      vertical-align: middle;\n      margin-right: -0.25em;\n    }\n\n    body .vertical-centered-box .content {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n      display: inline-block;\n      vertical-align: middle;\n      text-align: left;\n      font-size: 0;\n    }\n\n    .loader-circle {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      width: 120px;\n      height: 120px;\n      border-radius: 50%;\n      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);\n      margin-left: -60px;\n      margin-top: -60px;\n    }\n\n    .loader-line-mask {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      width: 60px;\n      height: 120px;\n      margin-left: -60px;\n      margin-top: -60px;\n      overflow: hidden;\n      -webkit-transform-origin: 60px 60px;\n      -moz-transform-origin: 60px 60px;\n      -ms-transform-origin: 60px 60px;\n      -o-transform-origin: 60px 60px;\n      transform-origin: 60px 60px;\n      -webkit-mask-image: -webkit-linear-gradient(top, #000000, rgba(0, 0, 0, 0));\n      -webkit-animation: rotate 1.2s infinite linear;\n      -moz-animation: rotate 1.2s infinite linear;\n      -o-animation: rotate 1.2s infinite linear;\n      animation: rotate 1.2s infinite linear;\n    }\n\n    .loader-line-mask .loader-line {\n      width: 120px;\n      height: 120px;\n      border-radius: 50%;\n      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);\n    }\n\n    #particles-background,\n    #particles-foreground {\n      left: -51%;\n      top: -51%;\n      width: 202%;\n      height: 202%;\n      -webkit-transform: scale3d(0.5, 0.5, 1);\n      -moz-transform: scale3d(0.5, 0.5, 1);\n      -ms-transform: scale3d(0.5, 0.5, 1);\n      -o-transform: scale3d(0.5, 0.5, 1);\n      transform: scale3d(0.5, 0.5, 1);\n    }\n\n    #particles-background {\n      background: #f0f8ff;\n       filter: blur(1px);\n  -webkit-filter: blur(1px);\n     background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);\n background-repeat: no-repeat;\n background-position: center 110px;\n  background-size: 100%;\n      }\n\n    lesshat-selector {\n      -lh-property: 0;\n    }\n\n    @-webkit-keyframes rotate {\n      0% {\n        -webkit-transform: rotate(0deg);\n      }\n\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n\n    @-moz-keyframes rotate {\n      0% {\n        -moz-transform: rotate(0deg);\n      }\n\n      100% {\n        -moz-transform: rotate(360deg);\n      }\n    }\n\n    @-o-keyframes rotate {\n      0% {\n        -o-transform: rotate(0deg);\n      }\n\n      100% {\n        -o-transform: rotate(360deg);\n      }\n    }\n\n    @keyframes rotate {\n      0% {\n        -webkit-transform: rotate(0deg);\n        -moz-transform: rotate(0deg);\n        -ms-transform: rotate(0deg);\n        transform: rotate(0deg);\n      }\n\n      100% {\n        -webkit-transform: rotate(360deg);\n        -moz-transform: rotate(360deg);\n        -ms-transform: rotate(360deg);\n        transform: rotate(360deg);\n      }\n    }\n\n    [not-existing] {\n      zoom: 1;\n    }\n\n    lesshat-selector {\n      -lh-property: 0;\n    }\n\n    @-webkit-keyframes fade {\n      0% {\n        opacity: 1;\n      }\n\n      50% {\n        opacity: 0.25;\n      }\n    }\n\n    @-moz-keyframes fade {\n      0% {\n        opacity: 1;\n      }\n\n      50% {\n        opacity: 0.25;\n      }\n    }\n\n    @-o-keyframes fade {\n      0% {\n        opacity: 1;\n      }\n\n      50% {\n        opacity: 0.25;\n      }\n    }\n\n    @keyframes fade {\n      0% {\n        opacity: 1;\n      }\n\n      50% {\n        opacity: 0.25;\n      }\n    }\n\n    [not-existing] {\n      zoom: 1;\n    }\n\n    lesshat-selector {\n      -lh-property: 0;\n    }\n\n    @-webkit-keyframes fade-in {\n      0% {\n        opacity: 0;\n      }\n\n      100% {\n        opacity: 1;\n      }\n    }\n\n    @-moz-keyframes fade-in {\n      0% {\n        opacity: 0;\n      }\n\n      100% {\n        opacity: 1;\n      }\n    }\n\n    @-o-keyframes fade-in {\n      0% {\n        opacity: 0;\n      }\n\n      100% {\n        opacity: 1;\n      }\n    }\n\n    @keyframes fade-in {\n      0% {\n        opacity: 0;\n      }\n\n      100% {\n        opacity: 1;\n      }\n    }\n\n    [not-existing] {\n      zoom: 1;\n    }\n  ",
        }}
      />
      <div id='particles-background' className='vertical-centered-box' />
      <div id='particles-foreground' className='vertical-centered-box' />
      <div className='vertical-centered-box ant-layout-loading'>
        <div className='content'>
          <GoogleLogin
            style={{ width: 600, height: 300, textAlign: 'center' }}
            clientId={vars.CLIENT_ID}
            onSuccess={responseGoogle}
            onFailure={(e) => console.log(e)}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <div>
                <div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <img src={require('../../shared/logo.png')} alt='Communication Tool' />
                </div>
                <Button
                  style={{
                    textAlign: 'center',
                    height: 50,
                    width: 600,
                    fontSize: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <Icon type='google' style={{ color: 'red' }} />
                  Đăng nhập với Google
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
