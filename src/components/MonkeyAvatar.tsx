import React, { useRef, useEffect, useState } from 'react';

interface MonkeyAvatarProps {
  isPasswordFocused: boolean;
  isShowingPassword: boolean;
  emailValue: string;
  onEmailFocus: () => void;
  onEmailBlur: () => void;
  onPasswordFocus: () => void;
  onPasswordBlur: () => void;
}

const MonkeyAvatar: React.FC<MonkeyAvatarProps> = ({
  isPasswordFocused,
  isShowingPassword,
  emailValue,
  onPasswordFocus,
  onPasswordBlur
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const eyeLRef = useRef<SVGGElement>(null);
  const eyeRRef = useRef<SVGGElement>(null);
  const armLRef = useRef<SVGSVGElement>(null);
  const armRRef = useRef<SVGGElement>(null);
  const peekingFingersRRef = useRef<SVGGElement>(null);
  const mouthRef = useRef<SVGGElement>(null);

  const [eyesCovered, setEyesCovered] = useState(false);
  const [mouthSize, setMouthSize] = useState('small');
  const [eyeScale, setEyeScale] = useState(1.5);

  // This hook handles mouth and eye scaling.
  useEffect(() => {
    const newScale = emailValue.length > 0 ? 1.1 : 1;
    setEyeScale(newScale);

    if (emailValue.length > 0) {
     setMouthSize('medium'); // Always medium when typing, regardless of @
   } else {
     setMouthSize('small');
   }
  }, [emailValue]);

  // Handle password field focus/blur
  useEffect(() => {
    if (isPasswordFocused) {
      coverEyes();
    } else {
      uncoverEyes();
    }
  }, [isPasswordFocused]);

  // Handle one-finger peeking animation
  useEffect(() => {
    if (eyesCovered) {
        if (isShowingPassword) {
            spreadFingers();
        } else {
            closeFingers();
        }
    }
  }, [isShowingPassword, eyesCovered]);
  
  // This effect applies the scale transform.
  useEffect(() => {
    if (!eyeLRef.current || !eyeRRef.current || eyesCovered) return;

    const transformValue = `scale(${eyeScale})`;

    eyeLRef.current.style.transform = transformValue;
    eyeRRef.current.style.transform = transformValue;
  }, [eyeScale, eyesCovered]);


  const coverEyes = () => {
    if (armLRef.current && armRRef.current) {
      armLRef.current.style.transform = 'translate(-90px, 5px) rotate(0deg)';
      armRRef.current.style.transform = 'translate(90px, 5px) rotate(0deg)';
      armLRef.current.style.visibility = 'visible';
      armRRef.current.style.visibility = 'visible';
      armLRef.current.style.transition = 'transform 0.4s ease-out';
      armRRef.current.style.transition = 'transform 0.4s ease-out 0.05s';
      setEyesCovered(true);
    }
  };

  const uncoverEyes = () => {
    if (armLRef.current && armRRef.current) {
      armLRef.current.style.transform = 'translate(0px, 220px) rotate(105deg)';
      armRRef.current.style.transform = 'translate(0px, 220px) rotate(-105deg)';
      setEyesCovered(false);
      closeFingers();
    }
  };

  const spreadFingers = () => {
    if (peekingFingersRRef.current) {
      peekingFingersRRef.current.style.transform = 'translateY(15px)';
      peekingFingersRRef.current.style.transition = 'transform 0.25s ease-in-out';
    }
  };

  const closeFingers = () => {
    if (peekingFingersRRef.current) {
      peekingFingersRRef.current.style.transform = 'translateY(0px)';
      peekingFingersRRef.current.style.transition = 'transform 0.25s ease-in-out';
    }
  };
  
  // Initialize arm and eye styles.
  useEffect(() => {
    if (armLRef.current && armRRef.current) {
        armLRef.current.style.transformOrigin = 'top left';
        armRRef.current.style.transformOrigin = 'top right';
        uncoverEyes();
    }
    // **FIXED**: The styles are now correctly applied to both eyeLRef and eyeRRef.
    if (eyeLRef.current && eyeRRef.current) {
        eyeLRef.current.style.transition = 'transform 0.2s ease-out';
        eyeRRef.current.style.transition = 'transform 0.2s ease-out';
        
        eyeLRef.current.style.transformOrigin = 'center center';
        eyeRRef.current.style.transformOrigin = 'center center';
    }
  }, []);

  return (
    <div
      className="relative w-32 h-32 mx-auto mb-4"
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        {/* The SVG paths are the same */}
        <defs>
          <circle id="armMaskPath" cx="100" cy="100" r="100" />
        </defs>
        <clipPath id="armMask">
          <use href="#armMaskPath" overflow="visible" />
        </clipPath>
        <circle cx="100" cy="100" r="100" fill="#a9ddf3" />
        <g className="body">
          <path className="bodyBG" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF" d="M200,158.5c0-20.2-14.8-36.5-35-36.5h-14.9V72.8c0-27.4-21.7-50.4-49.1-50.8c-28-0.5-50.9,22.1-50.9,50v50 H35.8C16,122,0,138,0,157.8L0,213h200L200,158.5z" />
          <path fill="#DDF1FA" d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z" />
        </g>
        <g className="earL">
          <circle fill="#ddf1fa" stroke="#3a5e77" strokeWidth="2.5" cx="47" cy="83" r="11.5" />
          <path d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1" stroke="#3a5e77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <g className="earR">
          <circle fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" cx="153" cy="83" r="11.5" />
          <path fill="none" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M153.7,78.9 c2.3,0,4.1,1.9,4.1,4.1c0,2.3-1.9,4.1-4.1,4.1" />
        </g>
        <path className="face" fill="#DDF1FA" d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46" />
        <path className="hair" fill="#FFFFFF" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474" />
        <g ref={eyeLRef} className="eyeL"><circle cx="85.5" cy="78.5" r="7" fill="#3a5e77" /><circle cx="84" cy="76" r="1.4" fill="#fff" /></g>
        <g ref={eyeRRef} className="eyeR"><circle cx="114.5" cy="78.5" r="7" fill="#3a5e77" /><circle cx="113" cy="76" r="1.4" fill="#fff" /></g>
        <path className="nose" d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z" fill="#3a5e77" />
        <g ref={mouthRef} className="mouth">
          <path className={`mouth-${mouthSize}`} fill="#617E92" d={ mouthSize === 'large' ? "M100 110.2c-9 0-16.2-7.3-16.2-16.2 0-2.3 1.9-4.2 4.2-4.2h24c2.3 0 4.2 1.9 4.2 4.2 0 9-7.2 16.2-16.2 16.2z" : mouthSize === 'medium' ? "M95,104.2c-4.5,0-8.2-3.7-8.2-8.2v-2c0-1.2,1-2.2,2.2-2.2h22c1.2,0,2.2,1,2.2,2.2v2 c0,4.5-3.7,8.2-8.2,8.2H95z" : "M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z" } style={{ transition: 'all 0.3s ease-out', transform: mouthSize === 'large' ? 'scale(1.1)' : mouthSize === 'medium' ? 'scale(1.05)' : 'scale(1)' }} />
        </g>
        <g className="arms" clipPath="url(#armMask)">
          <g ref={armLRef} className="armL">
            <polygon fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="121.3,98.4 111,59.7 149.8,49.3 169.8,85.4" />
            <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M134.4,53.5l19.3-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-10.3,2.8" />
            <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M150.9,59.4l26-7c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-21.3,5.7" />
            <g className="twoFingers">
              <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M158.3,67.8l23.1-6.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-23.1,6.2" />
              <path fill="#A9DDF3" d="M180.1,65l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L180.1,65z" />
              <path fill="#DDF1FA" stroke="#3A5E77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M160.8,77.5l19.4-5.2c2.7-0.7,5.4,0.9,6.1,3.5v0c0.7,2.7-0.9,5.4-3.5,6.1l-18.3,4.9" />
              <path fill="#A9DDF3" d="M178.8,75.7l2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c0.3,1.1-0.3,2.2-1.4,2.4l-2.2,0.6L178.8,75.7z" />
            </g>
          </g>
          <g ref={armRRef} className="armR">
            <polygon fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" points="78.7,98.4 89,59.7 50.2,49.3 30.2,85.4" />
            <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M65.6,53.5l-19.3-5.2c-2.7-0.7-5.4,0.9-6.1,3.5v0c-0.7,2.7,0.9,5.4,3.5,6.1l10.3,2.8" />
            <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M49.1,59.4l-26-7c-2.7-0.7-5.4,0.9-6.1,3.5v0c-0.7,2.7,0.9,5.4,3.5,6.1l21.3,5.7" />
            <g ref={peekingFingersRRef} className="twoFingersR">
              <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M41.7,67.8l-23.1-6.2c-2.7-0.7-5.4,0.9-6.1,3.5v0c-0.7,2.7,0.9,5.4,3.5,6.1l23.1,6.2" />
              <path fill="#a9ddf3" d="M19.9,65l-2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c-0.3,1.1,0.3,2.2,1.4,2.4l2.2,0.6L19.9,65z" />
              <path fill="#ddf1fa" stroke="#3a5e77" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5" d="M39.2,77.5l-19.4-5.2c-2.7-0.7-5.4,0.9-6.1,3.5v0c-0.7,2.7,0.9,5.4,3.5,6.1l18.3,4.9" />
              <path fill="#a9ddf3" d="M21.2,75.7l-2.2-0.6c1.1-0.3,2.2,0.3,2.4,1.4v0c-0.3,1.1,0.3,2.2,1.4,2.4l-2.2,0.6L21.2,75.7z" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default MonkeyAvatar;
