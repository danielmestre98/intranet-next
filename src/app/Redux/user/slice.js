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
            state.currentUser = action.payload;
        },
        logoutUser: (state, action) => {
            state.currentUser = null;
        },
    },
});

export const { fetchUserData, logoutUser } = userSlice.actions;

export default userSlice.reducer;
