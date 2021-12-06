import "./CatPageResult.css";

const CatPageResult = ({result, hideResult, reportitem}) => {
  return (
    <div className="resultpagep">
      <div className="resultpageclose">
        <img src="close.svg" onClick={hideResult}></img>
      </div>
      <div className="resultpage">
        <span>{result.name}</span>
      </div>
      <div className="resultpagereport">
        <span onClick={reportitem}>삭제요청하기</span>
      </div>
    </div>
  );
}

export default CatPageResult;