"use client";

import { completeTutorial } from "@/app/Redux/user/slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Joyride from "react-joyride";
import { useDispatch } from "react-redux";

const steps = [
    {
        target: ".fa-bell",
        disableBeacon: true,
        content:
            "Aqui você pode ver suas notificações de comunicados ou chamados (identificados pelo númedo dentro do círculo vermelho).",
    },
    {
        target: ".fa-gear",
        content: "Aqui ficam as opções relacionadas a você: perfil, deslogar, comunicados e todos os seus chamados.",
    },
    {
        target: ".hidden-menu",
        content: "Selecionando a opção perfil você poderá editar suas informações pessoais.",
        placement: "left-start",
    },
    {
        target: ".image-div",
        content: "Você agora pode definir uma imagem para o seu pefil.",
    },
    {
        target: ".botao-area-restrita",
        content: "Aqui você encontra as ferramentas disponíveis e links úteis relacionados ao seu departamento.",
    },
];

const Tutorial = () => {
    const router = useRouter();
    const [stepIndex, setStepIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const dispatch = useDispatch();

    const handleTourFinish = () => {
        router.push("/");
        dispatch(completeTutorial());
    };

    const handleJoyrideCallback = (data) => {
        const { action, index } = data;

        if ((action === "next" || action === "prev") && index === 2) {
            const userOptions = document.getElementById("menu-user");
            userOptions.click();
            router.push("/perfil");
        }
        //finalizar o tutorial
        if (action === "next" && index === currentStep && index === 4) {
            handleTourFinish();
        }
        //código maluco para não bugar o tutorial
        if (action === "next" && index === currentStep) {
            setStepIndex(index + 1);
            return;
        } else if (action === "next") {
            setCurrentStep(index + 1);
        } else {
            setCurrentStep(index);
        }
        if (action === "prev" && index === currentStep) {
            setStepIndex(index - 1);
        } else if (action === "prev") {
            setCurrentStep(index - 1);
        }
    };

    return (
        <>
            <Joyride
                steps={steps}
                run={true}
                continuous
                disableCloseOnEsc
                disableOverlayClose
                stepIndex={stepIndex}
                callback={handleJoyrideCallback}
                showBackButton={false}
                onFinish={handleTourFinish}
                locale={{
                    back: "Voltar",
                    close: "Fechar",
                    last: "Finalizar",
                    next: "Próximo",
                    open: "Abrir o diálogo",
                    skip: "Pular",
                }}
            />
        </>
    );
};

export default Tutorial;
