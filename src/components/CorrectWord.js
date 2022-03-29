import React from "react";

export default function CorrectWord(props) {

  const styles = {
    margin: "1rem 0 0",
  };

  return (
    <div>
      <article 
        className="display-correct-word"
        style={styles}
      >
        Correct Word: <span style={{ textTransform: "uppercase", letterSpacing: "1px" }}>{props.metaWord}</span> 🧁
      </article>
    </div>
  );
}