import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Noto Sans KR",
  src: "/static/fonts/NotoSansKR-Regular.otf",
});
Font.register({
  family: "Nanum Gothic",
  src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-ExtraBold.ttf",
});

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

const PDFViewer = ({ title, name, department, content }) => {
  const newDocument = {
    title: "React PDF 사용하기",
    author: "thewoowon",
    subject: "React PDF 사용하기",
    creator: "thewoowon",
    keywords: "react pdf",
    producer: "thewoowon",
    language: "ko",
  };

  return (
    <div className="min-h-screen">
      <PDFViewer className="min-h-screen w-full">
        <Document {...newDocument}>
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
      </PDFViewer>
    </div>
  );
};

// Path: components/PDFViewer.js

export default PDFViewer;
