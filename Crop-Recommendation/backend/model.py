import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
from sklearn.neighbors import KNeighborsClassifier


def predict_crop(N, P, K, Temperature, Humidity, PH, Rainfall):
    # loading data
    data = pd.read_csv('./data/Crop_recommendation.csv')

    # Label Encoding 
    data['label'] = LabelEncoder().fit_transform(data['label'])
    X = data.drop(['label'], axis=1)
    Y = data.label

    # training testing
    X_train, X_test, y_train, y_test = train_test_split(
        X, Y, test_size=0.20)
    scaler = StandardScaler()
    scaler.fit(X_train)

    # scaling
    X_train = scaler.transform(X_train)
    X_test = scaler.transform(X_test)

    classifier = KNeighborsClassifier(n_neighbors=5)
    classifier.fit(X_train, y_train)

    y_pred = classifier.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(accuracy)

    predict1 = classifier.predict(
        np.array([N, P, K, Temperature, Humidity, PH, Rainfall]).reshape(1, -1))

    crop_names = [
        'Apple(सेब)', 'Banana(केला)', 'Blackgram(काला चना)', 'Chickpea(काबुली चना)', 'Coconut(नारियल)',
        'Coffee(कॉफ़ी)', 'Cotton(कपास)', 'Grapes(अंगूर)', 'Jute(जूट)', 'Kidneybeans(राज़में)',
        'Lentil(मसूर की दाल)', 'Maize(मक्का)', 'Mango(आम)', 'Mothbeans(मोठबीन)', 'Mungbeans(मूंग)',
        'Muskmelon(खरबूजा)', 'Orange(संतरा)', 'Papaya(पपीता)', 'Pigeonpeas(कबूतर के मटर)',
        'Pomegranate(अनार)', 'Rice(चावल)', 'Watermelon(तरबूज)'
    ]

    crop_name = crop_names[int(predict1)]

    return crop_name, accuracy
