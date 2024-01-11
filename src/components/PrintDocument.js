import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

const PrintDocument = ({ completeTask, pendingTask, comment }) => {
  // Create styles
  const styles = StyleSheet.create({
    text: {
      marginVertical: 10,
    },
    divContainer: {
      paddingLeft: 10,
    },
    page: {
      flexDirection: "col",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>
            Date: {new Date().getDate()}-{new Date().getMonth() + 1}-
            {new Date().getFullYear()}
          </Text>
          <Text style={styles.text}>Completed Task:</Text>
          <View style={styles.divContainer}>
            {completeTask.map((ct, i) => (
              <Text
                key={i}
                style={Number}
                className="text-xl text-left decoration-list"
              >
                Task-{i + 1} :{ct.text}
              </Text>
            ))}
          </View>

          <Text style={styles.text}>Pending Task:</Text>
          <View style={styles.divContainer}>
            {pendingTask.map((pt, i) => (
              <Text
                key={i}
                style={Number}
                className="text-xl text-left decoration-list"
              >
                Task-{i + 1} :{pt.text}
              </Text>
            ))}
          </View>
          <Text style={styles.text}>Comment:</Text>
          <View style={styles.divContainer}>
            <Text>{comment || "Comments..."}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PrintDocument;
