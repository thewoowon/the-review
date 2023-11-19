import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
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

const PDFDownload = ({ title, name, department, content }) => {
  // PDF 문서의 스타일을 정의합니다
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "white",
      padding: 36,
    },
    titleSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      width: "100%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      fontFamily: "Noto Sans KR",
    },
    name: {
      fontSize: 12,
      fontFamily: "Noto Sans KR",
    },
    department: {
      fontSize: 12,
      fontFamily: "Noto Sans KR",
    },
    content: {
      fontSize: 10,
      fontFamily: "Noto Sans KR",
    },
  });
  return (
    <PDFDownloadLink
      document={
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
                display: "flex",
                flexDirection: "column",
                paddingTop: 20,
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
      }
      fileName="somename.pdf"
      style={{
        // bg-[#CBFF37] hover:bg-[#C1F235] cursor-pointer transition duration-200 ease-in-out px-8 py-4 text-lg text-black rounded-full font-bold
        backgroundColor: "#CBFF37",
        padding: "8px 16px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "black",
        borderRadius: "9999px",
        cursor: "pointer",
        transition: "all 200ms ease-in-out",
        "&:hover": {
          backgroundColor: "#C1F235",
        },
      }}
    >
      {({ blob, url, loading, error }) => (loading ? "로딩..." : "다운로드")}
    </PDFDownloadLink>
  );
};

export default PDFDownload;
