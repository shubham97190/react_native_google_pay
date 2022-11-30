/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { GooglePay, RequestDataType, AllowedCardNetworkType, AllowedCardAuthMethodsType } from 'react-native-google-pay'

const allowedCardNetworks: AllowedCardNetworkType[] = ['VISA', 'MASTERCARD']
const allowedCardAuthMethods: AllowedCardAuthMethodsType[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS']


const handleSuccess = (token: string) => {
  // Send a token to your payment gateway
  Alert.alert('Success', `token: ${token}`)
}

const handleError = (error: any) => Alert.alert('Error', `${error.code}\n${error.message}\n${error}`)
GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST)

const payWithGooglePay = (requestData: RequestDataType) => {
  // Check if Google Pay is available
  GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then((ready) => {
    if (ready) {
      // Request payment token
      GooglePay.requestPayment(requestData)
        .then(handleSuccess)
        .catch(handleError)
    }else{
      handleError(ready);
    }
  })

}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const gatewayRequestData: RequestDataType = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        gateway: 'example',
        // gatewayMerchantId:'exampleGatewayMerchantId',
        gatewayMerchantId: '16796680494747516588',
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '11',
      totalPriceStatus: 'FINAL', // PAYMENT AMOUNT STATUS 
      currencyCode: 'USD' // CURRENCY CODE
    },
    merchantName: 'Hello'  // MERCHANT NAME Information about the merchant requesting payment information
  }
  GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
  const [isAvailable, setIsAvialable] = useState(null)
  const [text, setText] = useState("")


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={backgroundStyle}>
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableOpacity style={styles.button} onPress={() => payWithGooglePay(gatewayRequestData)}>
            <Text style={styles.buttonText}>PAYMENT GATEWAY</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 18,
    color: '#222',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    height: 56,
    paddingHorizontal: 24,
    justifyContent: 'center',
    marginVertical: 8,
  },
  direct: {
    backgroundColor: '#db7d35',
  },
  stripe: {
    backgroundColor: '#556cd6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default App;
