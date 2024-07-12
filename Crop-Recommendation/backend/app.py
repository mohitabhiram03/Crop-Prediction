from flask_cors import CORS
from flask import Flask, request, jsonify
from model import predict_crop

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def home():
    return "Welcome to Crop Recommendation API"


@app.route("/api/data", methods=['POST'])
def predict():
    if request.method == 'POST':
        request_data = request.json
        N = float(request_data['Nitrogen'])
        P = float(request_data['Phosphorous'])
        K = float(request_data['Potassium'])
        Temperature = float(request_data['Temperature'])
        Humidity = float(request_data['Humidity'])
        PH = float(request_data['PH'])
        Rainfall = float(request_data['Rainfall'])

        print(N, P, K, Temperature, Humidity, PH, Rainfall)

        #  prediction
        crop_name, accuracy = predict_crop(
            N, P, K, Temperature, Humidity, PH, Rainfall)
        

        humidity_level = classify_humidity(Humidity)
        temperature_level = classify_temperature(Temperature)
        rainfall_level = classify_rainfall(Rainfall)
        N_level = classify_nitrogen(N)
        P_level = classify_phosphorous(P)
        potassium_level = classify_potassium(K)
        ph_level = classify_ph(PH)

        response_data = {
            'NLevel': N_level,
            'PLevel': P_level,
            'potassiumLevel': potassium_level,
            'humidityLevel': humidity_level,
            'temperatureLevel': temperature_level,
            'rainfallLevel': rainfall_level,
            'PHLevel': ph_level
        }

        return jsonify({'values': request_data, 'levels': response_data, 'cropName': crop_name})

    return jsonify({'message': 'Method not allowed'}), 405


def classify_humidity(humidity):
    if 1 <= humidity <= 33:
        return 'Low Humid'
    elif 34 <= humidity <= 66:
        return 'Medium Humid'
    else:
        return 'High Humid'


def classify_temperature(temperature):
    if 0 <= temperature <= 6:
        return 'Cool'
    elif 7 <= temperature <= 25:
        return 'Warm'
    else:
        return 'Hot'


def classify_rainfall(rainfall):
    if 1 <= rainfall <= 100:
        return 'Less'
    elif 101 <= rainfall <= 200:
        return 'Moderate'
    else:
        return 'Heavy Rain'


def classify_nitrogen(nitrogen):
    if 1 <= nitrogen <= 50:
        return 'Less'
    elif 51 <= nitrogen <= 100:
        return 'Moderate'
    else:
        return 'High'


def classify_phosphorous(phosphorous):
    if 1 <= phosphorous <= 50:
        return 'Less'
    elif 51 <= phosphorous <= 100:
        return 'Moderate'
    else:
        return 'High'


def classify_potassium(potassium):
    if 1 <= potassium <= 50:
        return 'Less'
    elif 51 <= potassium <= 100:
        return 'Moderate'
    else:
        return 'High'


def classify_ph(PH):
    if 0 <= PH <= 5:
        return 'Acidic'
    elif 6 <= PH <= 8:
        return 'Neutral'
    else:
        return 'Alkaline'


if __name__ == "__main__":
    app.run(debug=True)
