# eaharaCustomerApp
Eahara Customer Application
( important notes are last to this page)



Version : 1.0.6
Changes : Change Pasword, Profile Update and Address Add/Edit/Delete are done.
Pending : Tab 1 - Search For all Items, search Shops name, search item in one shop are pending.
                  Selection of address in Checkout, getting current location Pending.
          Tab 2 - Order Track Feautures are Pending.
          Tab 3 - Share App Feauture Pending (Referral Screen)
Date    : 02-07-2020

Version : 1.0.5
Changes : Location selection, updation done, Sub pages are done for change password and profile
          Bug fixes in Add to cart button done.
Pending : Function for update in Change password and Profile Page and Address Screen Pednding,
          Tab 2 Order Track Feautures are Pending
Date    : 02-07-2020

Version : 1.0.4
Changes : Loader Added (Spinner NGX Added, Interceptor Added to show loader) My Cart Bug Fixes Added.
Date    : 28-06-2020

Version : 1.0.3
Changes : Track Order Tab View List Screen, Profile View List Screen, Icons Enlarge.
Pending : Whole Sub Pages of Two Above New Tabs
Date    : 28-06-2020

Version : 1.0.2
Changes : Add to Cart Screen, Redirection to Cart, Increment/Decrement Qty Done, 
          Remove Item Done, Proceed to Check out Screen done, Promo Code add and Wallet Use done
          Back Button Handled Properly, Booking Order Completed Successfully.
Pending : Add Location Selection, Save Location in Booking Order, Add Loader whenever Data loading
Date    : 27-06-2020

Version : 1.0.1
Changes : Shop Item :ist Page, Add to Cart Page, Token Storage, Cart Items Storage
Pending : Add function ( Add to cart, redirect to cart)
Date    : 26-06-2020

Version : 1.0
Changes : Login, forget Password, Shop List Page
Date    : 01-04-2020







Important Notes
Ionic Changes not works on Browser (ionChnage)
chrome://inspect/#devices

gENERATE KEY: keytool -genkey -v -keystore eahara-key.keystore -alias alias_eahara -keyalg RSA -keysize 2048 -validity 10000
PASSKEY: HFS@2020

Android Play Store

Deps :
- ionic cordova plugin add cordova-plugin-app-version
- ionic cordova plugin add cordova-plugin-app-update

- keytool -v -list -keystore eahara-key.keystore  ( for checking Keystore Details ...)

Step 1
- sudo ionic cordova build android --configuration staging --release

- sudo ionic cordova build android --prod --release
- keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

- sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore eahara-key.keystore E:\MobileApp\EaharaCustomer\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk alias_eahara

- sudo zipalign -v 4 E:\MobileApp\EaharaCustomer\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk  Eahara_V1.apk
