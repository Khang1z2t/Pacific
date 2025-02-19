import { useState, useEffect } from "react";
import LoginCard from "../components/LoginCard";

const Login = () => {
    const [showWebcam, setShowWebcam] = useState(false);
    const [videoStream, setVideoStream] = useState(null);

    useEffect(() => {
        return () => {
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [videoStream]);

    const handleLogin = async (username, password) => {
        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8085/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            alert(data.message);
            if (data.data) window.location.href = "/admin/user";
        } catch (error) {
            console.error("Error:", error);
            alert("Lỗi khi đăng nhập, vui lòng thử lại.");
        }
    };

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoStream(stream);
            setShowWebcam(true);
        } catch (err) {
            alert("Không thể truy cập webcam.");
        }
    };

    const stopVideo = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
        setShowWebcam(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
            <LoginCard handleLogin={handleLogin} />
            <button onClick={startVideo} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md">Đăng nhập bằng khuôn mặt</button>
            {showWebcam && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-lg">
                        <video autoPlay playsInline ref={(video) => video && (video.srcObject = videoStream)} className="w-80 rounded-md" />
                        <button onClick={stopVideo} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md">Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;