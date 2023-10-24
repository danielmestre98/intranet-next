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
        removeNotif: (state, action) => {
            const index = state.currentUser.notifications.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
                state.currentUser.notifications.splice(index, 1);
            }
        },
        updateRecadastramento: (state, action) => {
            state.currentUser.recadastramento = action.payload;
        },

        updateRamal: (state, action) => {
            state.currentUser.ramais.ramal_numero = action.payload;
        },

        logoutUser: (state) => {
            localStorage.removeItem("userToken");
            state.currentUser = null;
        },
        updateProfile: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                usuario_nome: action.payload.usuario_nome,
                ramais: { ...state.currentUser.ramais, ramal_numero: action.payload.ramal },
                usuario_aniversario: action.payload.usuario_aniversario,
            };
        },
    },
});

export const { fetchUserData, logoutUser, userNotif, updateProfile, removeNotif, updateRamal, updateRecadastramento } =
    userSlice.actions;

export default userSlice.reducer;
