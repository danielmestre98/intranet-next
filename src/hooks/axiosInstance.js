"use client";

import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your API base URL here
    timeout: 10000, // Set a timeout for requests if needed
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
