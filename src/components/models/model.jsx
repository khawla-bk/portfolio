"use client";

import Image from "next/image";
import Avatar from "../../assets/avatar.png";
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function useTypingEffect(text, speed = 50, resetTrigger = "") {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);

        let index = 0;
        const id = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));  // Update with sliced text
                index++;
            } else {
                clearInterval(id);
                setIsTyping(false);
            }
        }, speed);

        setIntervalId(id);

        return () => clearInterval(id);
    }, [text, speed, resetTrigger]);

    const completeTyping = () => {
        if (intervalId) clearInterval(intervalId);
        setDisplayedText(text);  // Show full text immediately
        setIsTyping(false);
    };

    return { displayedText, isTyping, completeTyping };
}

export default function AvatarViewer() {
    const [step, setStep] = useState(1);   
    const [name, setName] = useState('');  
    const [inputValue, setInputValue] = useState(''); 
    const [isVisible, setIsVisible] = useState(true);  // State to control visibility

    const textStages = [
        "Hi! Please enter your name to get started.",
        `Hi ${capitalizeFirstLetter(name)}! I am Khawla, a full-stack developer specializing in Frontend technologies such as React, and 3D experiences.`,
        `I am thrilled to have you here! Feel free to browse through my portfolio. Enjoy your visit!`,
    ];

    const { displayedText, isTyping, completeTyping } = useTypingEffect(textStages[step - 1], 50, step);

    const handleNext = () => {
        if (isTyping) {
            completeTyping();
        } else {
            if (step === 1 && inputValue) {
                setName(inputValue); 
                setStep(2);  
            } else if (step === 2) {
                setStep(3);  
            } else if (step === 3) {
                // Hide avatar and dialog box after "Browse Portfolio" is clicked
                setIsVisible(false);
            }
        }
    };

    return (
        <div className={styles.container}>
            {/* Conditionally render Avatar and Dialog if they are visible */}
            {isVisible && (
                <>
                    <div className={styles.avatarWrapper}>
                        <Image src={Avatar} alt="avatar" width={150} height={150} className={styles.avatar} />
                    </div>

                    <div className={styles.dialogBox}>
                        {step === 1 ? (
                            <div>
                                <input
                                    type="text"
                                    value={inputValue}
                                    placeholder="Hello user. Please enter your name..."
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        ) : (
                            <p className={styles.dialogText}>{displayedText}</p>
                        )}

                        <div className={styles.nextButtonWrapper}>
                            <span className={styles.nextButton} onClick={handleNext}>
                                {step === 3 ? "Browse Portfolio" : "Next"}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
