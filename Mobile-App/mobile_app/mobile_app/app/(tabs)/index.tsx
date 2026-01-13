import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const pic = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      if (pic) {
        setPhoto(pic.uri);
      }
    }
  };

  const analyzeTea = async () => {
    if (!photo) return;
    
    setProcessing(true);
    
    try {
      // OPTION 1: Use TensorFlow Lite (uncomment when ready)
      // import { predictTeaQuality } from '../../services/mlService';
      // const prediction = await predictTeaQuality(photo);
      // setResult(prediction);
      
      // OPTION 2: Use Backend API (uncomment when ready)
      // import { predictTeaQualityAPI } from '../../services/apiService';
      // const prediction = await predictTeaQualityAPI(photo);
      // setResult(prediction);
      
      // TEMPORARY: Simulated prediction (remove when ML is ready)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        grade: "Premium Grade A",
        quality: 92,
        price: "LKR 450/kg",
        confidence: 94,
      });
      
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze image. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setPhoto(null);
    setResult(null);
    setProcessing(false);
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>📷 Camera Permission Required</Text>
        <Text style={styles.errorSubtext}>
          We need camera access to analyze tea leaves
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍃 Tea Quality Grader</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Quality Analysis</Text>
      </View>

      {/* Camera or Result View */}
      {!photo ? (
        <>
          <CameraView
            style={styles.camera}
            ref={cameraRef}
            facing="back"
          />
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              📸 Position tea leaf in center
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          
          {result && !processing && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>✅ Analysis Complete</Text>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Grade:</Text>
                <Text style={styles.resultValue}>{result.grade}</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Quality Score:</Text>
                <Text style={styles.resultValue}>{result.quality}%</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Est. Price:</Text>
                <Text style={styles.resultValue}>{result.price}</Text>
              </View>
              
              <View style={styles.confidenceBar}>
                <View
                  style={[
                    styles.confidenceFill,
                    { width: `${result.confidence}%` },
                  ]}
                />
              </View>
              <Text style={styles.confidenceText}>
                {result.confidence}% Confidence
              </Text>
            </View>
          )}

          {processing && (
            <View style={styles.processingCard}>
              <ActivityIndicator size="large" color="#1976D2" />
              <Text style={styles.processingText}>Analyzing tea quality...</Text>
            </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {!photo ? (
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>📷 Capture Tea Leaf</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            {!result && !processing && (
              <TouchableOpacity
                style={styles.analyzeButton}
                onPress={analyzeTea}
              >
                <Text style={styles.buttonText}>🔍 Analyze Quality</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={result ? styles.newScanButton : styles.retakeButton}
              onPress={reset}
            >
              <Text style={styles.buttonText}>
                {result ? "📸 New Scan" : "↩️ Retake"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#1976D2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E3F2FD",
  },
  camera: {
    flex: 1,
  },
  instructions: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  instructionText: {
    backgroundColor: "rgba(25, 118, 210, 0.9)",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "600",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  preview: {
    flex: 1,
  },
  resultCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 15,
    textAlign: "center",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  resultValue: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "bold",
  },
  confidenceBar: {
    height: 8,
    backgroundColor: "#E3F2FD",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#1976D2",
  },
  confidenceText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  processingCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  processingText: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "600",
    marginTop: 15,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  captureButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#1976D2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  captureButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtons: {
    gap: 12,
  },
  analyzeButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  retakeButton: {
    backgroundColor: "#64B5F6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  newScanButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});