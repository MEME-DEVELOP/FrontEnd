import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { width } from '@mui/system';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    borderColor: 'tomato',
    width: 500
  }
});

// Create Document Component
const MyDocument = (props) => {

  const docData = JSON.parse(props.datos)
  return(
    <Document>
    <Page size="A4" style={styles.page}>
        
      
      {docData.reg.map((it, indice) => {
        
        return (
            <View style={styles.section}>
                <Text>{docData.nombres[indice]}</Text>
                <Text>{"   " + it.cantidad}</Text>
                <Text>{"    " + it.constot}</Text>
          </View> 
          )})
      }
      
    </Page>
  </Document>

  )
}; 

export default MyDocument;

