"use client";

import { createSlice } from "@reduxjs/toolkit";

/**
 * estrutura padrão do usuário:
 * departamento,
 * departamento_id,
 * drads,
 * email,
 * local,
 * pin,
 * ramal,
 * ramal_seds,
 * recadastramento,
 * tecnico,
 * tecnicoManut,
 * tutorial,
 * usuario_aniversario,
 * usuario_id,
 * usuario_img,
 * usuario_login,
 * usuario_nome,
 */

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserData: (state, action) => {
            //Deixar o nome do usuário apenas as primeiras letra maiúsculas
            action.payload.usuario_nome = action.payload.usuario_nome
                .toLowerCase()
                .replace(/\b\w/g, (l) => l.toUpperCase());
            state.currentUser = action.payload;
        },
        userNotif: (state, action) => {
            state.currentUser = { ...state.currentUser, notifications: action.payload };
        },
        logoutUser: (state) => {
            localStorage.removeItem("userToken");
            state.currentUser = null;
        },
    },
});

export const { fetchUserData, logoutUser, userNotif } = userSlice.actions;

export default userSlice.reducer;
