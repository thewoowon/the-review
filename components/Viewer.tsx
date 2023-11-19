import React from "react";

const styles = {
  division: {
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
};

const Viewer = ({
  title,
  name,
  department,
  content,
}: {
  title: string;
  name: string;
  department: string;
  content: string;
}) => {
  return (
    <div className="flex-1">
      <div
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <div style={styles.titleSection}>
          <div style={styles.title}>{title}</div>
          <div style={styles.department}>
            {name} / {department}
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: 20,
            width: "100%",
          }}
        >
          {content?.split("\n").map((item: string, index: number) => (
            <div
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
              <div style={styles.content}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewer;
