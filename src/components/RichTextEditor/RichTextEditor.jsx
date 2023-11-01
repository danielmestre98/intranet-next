"use client";

import { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import axios from "@/hooks/axiosInstance";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorDiv } from "./styles";

const RichTextEditor = ({ disableLink, disableImage }) => {
    var toolbarOptions = ["inline", "blockType", "fontSize", "textAlign", "colorPicker", "history"];

    if (!disableLink) toolbarOptions.push("link");
    if (!disableImage) toolbarOptions.push("image");

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
                    options: toolbarOptions,
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
                name="rich-text-editor"
                id="rich-text-editor"
                cols="30"
                rows="10"
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
        </EditorDiv>
    );
};

export default RichTextEditor;
