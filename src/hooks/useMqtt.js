import { useState, useEffect, useCallback, useRef } from "react";
import mqtt from "mqtt";
import { toast } from "sonner";

const MQTT_URL = "ws://192.168.1.33:8883"; // Ganti dengan URL broker yang sesuai

function useMqtt(username, role) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState(false); // Menyimpan token JWT yang didapat dari server
  const mqttClientRef = useRef(null);

  // Fungsi untuk mengambil token dari API
  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch("/api/get-token");
      if (response.ok) {
        setToken(true);
      } else {
        console.error("Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }, []);

  // Fungsi untuk menghubungkan ke broker MQTT
  const connectMqtt = useCallback(() => {
    if (!token) {
      console.error("No token available for MQTT connection");
      return;
    }

    console.log("Attempting to connect to MQTT broker...");
    const mqttClient = mqtt.connect(MQTT_URL, {
      username,
      password: role,
      keepalive: 60, // Kirim ping setiap 60 detik
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      setIsConnected(true);
      toast.success("Terhubung Ke Jaringan MQT-Tech!");
    });

    mqttClient.on("error", (error) => {
      console.error("MQTT connection error:", error.message);
      setIsConnected(false);
    });

    mqttClient.on("offline", () => {
      console.warn("MQTT broker is offline. Attempting to reconnect...");
      setIsConnected(false);
    });

    mqttClient.on("message", (topic, message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { topic, message: message.toString() },
      ]);
    }); 

    mqttClientRef.current = mqttClient;
  }, [token, username, role]);

  // Fungsi untuk subscribe ke topic tertentu
  const subscribeToTopic = useCallback((topic) => {
    const mqttClient = mqttClientRef.current;
    if (mqttClient && mqttClient.connected) {
      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error("Failed to subscribe to topic:", err);
          toast.error("Failed to subscribe to topic");
        }
      });
    } else {
      toast.warning("Tidak Terhubung Ke Jaringan MQT-Tech");
    }
  }, []);

  // Fungsi untuk unsubscribe dari topic tertentu
  const unsubscribeFromTopic = useCallback((topic) => {
    const mqttClient = mqttClientRef.current;
    if (mqttClient && mqttClient.connected) {
      mqttClient.unsubscribe(topic, (err) => {
        if (err) {
          console.error("Failed to unsubscribe from topic:", err);
        }
      });
    }
  }, []);

  // Fungsi untuk publish pesan ke topic tertentu
  const publishMessage = useCallback((topic, message) => {
    const mqttClient = mqttClientRef.current;
    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(topic, message, (err) => {
        if (err) {
          console.error("Failed to publish message:", err);
        }
      });
    } else {
      toast.error("Tidak Terhubung Ke Jaringan MQT-Tech");
    }
  }, []);

  // Mengambil token saat pertama kali komponen dipasang
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Menghubungkan ke broker saat token sudah tersedia
  useEffect(() => {
    if (token) {
      connectMqtt();
    }
  }, [token, connectMqtt]);

  // Cleanup: Disconnect saat komponen dilepas
  useEffect(() => {
    return () => {
      const mqttClient = mqttClientRef.current;
      if (mqttClient) {
        mqttClient.end();
        console.log("Disconnected from MQTT broker");
        setIsConnected(false);
      }
    };
  }, []);

  return {
    isConnected,
    messages,
    subscribeToTopic,
    unsubscribeFromTopic,
    publishMessage,
  };
}

export default useMqtt;
