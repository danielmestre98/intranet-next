"use client";

import { useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { ImageCropDiv } from "./styles";
import axios from "../../hooks/axiosInstance";
import { getCroppedImg } from "./canvasUtils";

const ImgCrop = () => {
    const [show, setShow] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const rotation = 0;
    const [image, setImage] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);

    const handleToggle = () => {
        setImage(null);
        setShow(!show);
    };

    const onImgSelected = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCompletedCrop(croppedAreaPixels);
    }, []);

    const handleImgSubmit = async (e) => {
        e.preventDefault();
        const imagem = await getCroppedImg(image, completedCrop, rotation);
        const formData = new FormData();
        await fetch(imagem)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], "imagem.jpg");
                formData.append("image", file);
            });
        axios
            .post(`/user/upload-photo`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then(() => {
                window.location.reload(true);
            });
    };

    return (
        <>
            <Button onClick={handleToggle} size="sm">
                Alterar imagem de perfil
            </Button>
            <Modal size="xl" show={show} onHide={handleToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Imagem de Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label style={{ color: "red", textAlign: "center", width: "100%" }}>
                            <b>Formatos aceitos: jpg, jpeg ou png.</b>
                        </Form.Label>
                        <Form.Control onChange={onImgSelected} accept="image/*" type="file" />
                    </Form.Group>

                    {image && (
                        <ImageCropDiv>
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 4}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </ImageCropDiv>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleToggle}>
                        Fechar
                    </Button>
                    <Button onClick={handleImgSubmit}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImgCrop;
