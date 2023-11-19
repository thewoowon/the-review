import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// PDF 문서의 스타일을 정의합니다
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
  },
  titleSection: {
    flexGrow: 1,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  name: {
    fontSize: 12,
  },
  department: {
    fontSize: 12,
  },
  content: {
    fontSize: 10,
  },
});

const PDF = ({ title, name, department, content }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.department}>
            {name} / {department}
          </Text>
        </View>
        <View
          style={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: 20,
            width: "100%",
          }}
        >
          {content?.split("\n").map((item, index) => (
            <View
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <Text style={styles.content}>{item}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
