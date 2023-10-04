"use client";

import { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import axios from "@/hooks/axiosInstance";

import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorDiv } from "./styles";

const RichTextEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const uploadImageCallback = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            axios
                .post("/comunicados/send-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Important for multipart/form-data requests
                    },
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return (
        <EditorDiv>
            <Editor
                onEditorStateChange={setEditorState}
                editorClassName="text-box"
                toolbarClassName="toolbar-box"
                wrapperClassName="wrapper-box"
                localization={{
                    locale: "pt",
                }}
                toolbar={{
                    options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "textAlign",
                        "colorPicker",
                        "link",
                        "history",
                        "image",
                    ],
                    inline: {
                        options: ["bold", "italic", "underline"],
                    },
                    list: { inDropdown: true },
                    image: false,
                    image: {
                        urlEnabled: false,
                        uploadEnabled: true,
                        aligmentEnabled: true,
                        uploadCallback: uploadImageCallback,
                        previewImage: true,
                        inputAccept: "image/*",
                        alt: { present: true, mandatory: false },
                        defaultSize: {
                            height: "auto",
                            width: "auto",
                        },
                    },
                }}
            />
            <textarea
                hidden
                readOnly
                name="comunicado-html"
                id="comunicado-html"
                cols="30"
                rows="10"
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
        </EditorDiv>
    );
};

export default RichTextEditor;
