# Cordova Test App
This is a simple [Cordova][cordova] test app together with a simple NodeJS server. You can take a picture in the app and it gets synchronized via the server and all connected devices.

## Environments
It works on iOS, Android and the browser. If you run it in the emulator, you can use the hardware camera from your laptop on android. The camera is also working in the browser.

## Client
The standard cordova development environment, packed with some frontend development tools to use SASS and JADE. Have a look in the [package.json][package.json] to the tools and the scripts that you can run.

### Get it up and running
  1. Make sure you install [Cordova][cordova] according to there [docs][docs] and have android and iOS up and running.
  2. `cordova prepare`
  3. `cordova emulate browser`
  4. `cordova emulate android`
  5. `cordova emulate ios`

Unfortunately you need to run every command separately for every platform. Make your live easier and run in separate shells instances ;)

## Server
Simple NodeJS server to provide an endpoint for the client. It uses Socket.io to synchronize the clients and as communication channel between client and server. Also the server saves the uploaded images extracted from a base64 string.

[cordova]: https://cordova.apache.org/
[docs]: https://cordova.apache.org/docs/en/latest/
[package.json]: /client/package.json