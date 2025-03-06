function Pre(props) {
  return <div className="pre" id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Pre;