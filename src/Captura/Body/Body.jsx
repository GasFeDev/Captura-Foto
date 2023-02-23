import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Webcam from "react-webcam";
import "./Body.css";

const Body = () => {
  const [showTab2, setShowTab2] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const webcamRef = React.useRef(null);
  const [, setCaptured] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  const toggleTab2 = () => {
    setShowTab2(true);
  };

  const capture = React.useCallback(() => {
    setCapturing(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturing(false);
    setImgSrc(imageSrc);
    setCaptured(true);
  }, [webcamRef]);

  const handleRegresar = () => {
    setShowTab2(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-right">
          {showTab2 ? (
            <Button variant="outline-secondary" onClick={handleRegresar}>
              Regresar
            </Button>
          ) : (
            <Button variant="outline-secondary" onClick={toggleTab2}>
              Capturar Foto
            </Button>
          )}
        </Col>
      </Row>
      {showTab2 ? (
        <div>
          <div style={{ marginTop: "20px" }}>
            {imgSrc ? (
              <img src={imgSrc} alt="captured" />
            ) : (
              <>
                {capturing ? (
                  <Spinner animation="border" role="status" />
                ) : (
                  <div className="camera-container-wrapper">
                    <div className="camera-container">
                      <Webcam
                        className="photo-container"
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                          facingMode: "environment",
                        }}
                      />
                      <Button variant="primary" onClick={capture}>
                        Tomar foto
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}{" "}
    </Container>
  );
};

export default Body;
