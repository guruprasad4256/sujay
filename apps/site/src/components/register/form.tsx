import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Axios } from '../utils/axiosKits';
import styles from '../RegisterForm.module.css'; 
import React, { useEffect, useState } from 'react';
const handleSendOTP = () => {
    // Placeholder logic for sending OTP
    console.log('Sending OTP...'); // Replace this with your actual OTP sending logic
  };

const form = () => {
    const [CurrentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const { addToast } = useToasts();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const jsonData = [
        {
         "S. No.": 1,
         "DISTRICT": "ANDAMAN_NICOBAR_IS",
         "STATE": "Andman & Nicobar Island"
        },
        {
         "S. No.": 2,
         "DISTRICT": "ADILABAD",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 3,
         "DISTRICT": "ANANTAPUR",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 4,
         "DISTRICT": "CHITTOOR",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 5,
         "DISTRICT": "EAST_GODAVARI",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 6,
         "DISTRICT": "GUNTUR",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 7,
         "DISTRICT": "HYDERABAD",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 8,
         "DISTRICT": "Kadapa",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 9,
         "DISTRICT": "KARIMNAGAR",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 10,
         "DISTRICT": "KHAMMAM\/BHADRACHALAM",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 11,
         "DISTRICT": "KRISHNA",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 12,
         "DISTRICT": "KURNOOL",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 13,
         "DISTRICT": "MAHBUBNAGAR",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 14,
         "DISTRICT": "MEDAK",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 15,
         "DISTRICT": "NALGONDA",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 16,
         "DISTRICT": "NELLORE",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 17,
         "DISTRICT": "NIZAMABAD",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 18,
         "DISTRICT": "PRAKASAM",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 19,
         "DISTRICT": "RANGAREDDI",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 20,
         "DISTRICT": "SRIKAKULAM",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 21,
         "DISTRICT": "VISAKHAPATNAM",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 22,
         "DISTRICT": "VIZIANAGARAM",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 23,
         "DISTRICT": "WARANGAL",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 24,
         "DISTRICT": "WEST_GODAVARI",
         "STATE": "Andhra Pradesh"
        },
        {
         "S. No.": 25,
         "DISTRICT": "ANJAW",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 26,
         "DISTRICT": "CHANGLANG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 27,
         "DISTRICT": "EAST KAMENG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 28,
         "DISTRICT": "EAST SIANG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 29,
         "DISTRICT": "KURUNG KUMEY",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 30,
         "DISTRICT": "LOHIT",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 31,
         "DISTRICT": "LOWER DIBANG_VALLEY",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 32,
         "DISTRICT": "LOWER SUBANSIRI",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 33,
         "DISTRICT": "PAPUM PARE",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 34,
         "DISTRICT": "TAWANG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 35,
         "DISTRICT": "TIRAP",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 36,
         "DISTRICT": "UPPER DIBANG VALLEY",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 37,
         "DISTRICT": "UPPER SIANG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 38,
         "DISTRICT": "UPPER SUBANSIRI",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 39,
         "DISTRICT": "WEST KAMENG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 40,
         "DISTRICT": "WEST SIANG",
         "STATE": "Arunachal Pradesh"
        },
        {
         "S. No.": 41,
         "DISTRICT": "BAKSA",
         "STATE": "Assam"
        },
        {
         "S. No.": 42,
         "DISTRICT": "BARPETA",
         "STATE": "Assam"
        },
        {
         "S. No.": 43,
         "DISTRICT": "BONGAIGAON",
         "STATE": "Assam"
        },
        {
         "S. No.": 44,
         "DISTRICT": "CACHAR",
         "STATE": "Assam"
        },
        {
         "S. No.": 45,
         "DISTRICT": "CHIRANG",
         "STATE": "Assam"
        },
        {
         "S. No.": 46,
         "DISTRICT": "DARRANG",
         "STATE": "Assam"
        },
        {
         "S. No.": 47,
         "DISTRICT": "DHEMAJI",
         "STATE": "Assam"
        },
        {
         "S. No.": 48,
         "DISTRICT": "DHUBRI",
         "STATE": "Assam"
        },
        {
         "S. No.": 49,
         "DISTRICT": "DIBRUGARH",
         "STATE": "Assam"
        },
        {
         "S. No.": 50,
         "DISTRICT": "GOALPARA",
         "STATE": "Assam"
        },
        {
         "S. No.": 51,
         "DISTRICT": "GOLAGHAT",
         "STATE": "Assam"
        },
        {
         "S. No.": 52,
         "DISTRICT": "HAILAKANDI",
         "STATE": "Assam"
        },
        {
         "S. No.": 53,
         "DISTRICT": "JORHAT",
         "STATE": "Assam"
        },
        {
         "S. No.": 54,
         "DISTRICT": "KAMRUP",
         "STATE": "Assam"
        },
        {
         "S. No.": 55,
         "DISTRICT": "KARBI ANGLONG",
         "STATE": "Assam"
        },
        {
         "S. No.": 56,
         "DISTRICT": "KARIMGANJ",
         "STATE": "Assam"
        },
        {
         "S. No.": 57,
         "DISTRICT": "KOKRAJHAR",
         "STATE": "Assam"
        },
        {
         "S. No.": 58,
         "DISTRICT": "LAKHIMPUR",
         "STATE": "Assam"
        },
        {
         "S. No.": 59,
         "DISTRICT": "MARIGAON",
         "STATE": "Assam"
        },
        {
         "S. No.": 60,
         "DISTRICT": "NAGAON",
         "STATE": "Assam"
        },
        {
         "S. No.": 61,
         "DISTRICT": "NALBARI",
         "STATE": "Assam"
        },
        {
         "S. No.": 62,
         "DISTRICT": "NORTH_CACHAR_HILLS",
         "STATE": "Assam"
        },
        {
         "S. No.": 63,
         "DISTRICT": "SIBSAGAR",
         "STATE": "Assam"
        },
        {
         "S. No.": 64,
         "DISTRICT": "SONITPUR",
         "STATE": "Assam"
        },
        {
         "S. No.": 65,
         "DISTRICT": "TINSUKIA",
         "STATE": "Assam"
        },
        {
         "S. No.": 66,
         "DISTRICT": "UDALGURI",
         "STATE": "Assam"
        },
        {
         "S. No.": 67,
         "DISTRICT": "ARARIA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 68,
         "DISTRICT": "ARWAL",
         "STATE": "Bihar"
        },
        {
         "S. No.": 69,
         "DISTRICT": "AURANGABAD-BI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 70,
         "DISTRICT": "BANKA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 71,
         "DISTRICT": "BEGUSARAI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 72,
         "DISTRICT": "BHAGALPUR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 73,
         "DISTRICT": "BHOJPUR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 74,
         "DISTRICT": "BUXAR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 75,
         "DISTRICT": "DARBHANGA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 76,
         "DISTRICT": "EAST CHAMPARAN",
         "STATE": "Bihar"
        },
        {
         "S. No.": 77,
         "DISTRICT": "GAYA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 78,
         "DISTRICT": "GOPALGANJ",
         "STATE": "Bihar"
        },
        {
         "S. No.": 79,
         "DISTRICT": "JAMUI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 80,
         "DISTRICT": "JEHANABAD",
         "STATE": "Bihar"
        },
        {
         "S. No.": 81,
         "DISTRICT": "KAIMUR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 82,
         "DISTRICT": "KATIHAR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 83,
         "DISTRICT": "KHAGARIA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 84,
         "DISTRICT": "KISHANGANJ",
         "STATE": "Bihar"
        },
        {
         "S. No.": 85,
         "DISTRICT": "LAKHISARAI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 86,
         "DISTRICT": "MADHEPURA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 87,
         "DISTRICT": "MADHUBANI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 88,
         "DISTRICT": "MUNGER",
         "STATE": "Bihar"
        },
        {
         "S. No.": 89,
         "DISTRICT": "MUZAFFARPUR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 90,
         "DISTRICT": "NALANDA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 91,
         "DISTRICT": "NAWADA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 92,
         "DISTRICT": "PATNA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 93,
         "DISTRICT": "PURNIA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 94,
         "DISTRICT": "ROHTAS",
         "STATE": "Bihar"
        },
        {
         "S. No.": 95,
         "DISTRICT": "SAHARSA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 96,
         "DISTRICT": "SAMASTIPUR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 97,
         "DISTRICT": "SARAN",
         "STATE": "Bihar"
        },
        {
         "S. No.": 98,
         "DISTRICT": "SHEIKHPURA",
         "STATE": "Bihar"
        },
        {
         "S. No.": 99,
         "DISTRICT": "SHEOHAR",
         "STATE": "Bihar"
        },
        {
         "S. No.": 100,
         "DISTRICT": "SITAMARHI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 101,
         "DISTRICT": "SIWAN",
         "STATE": "Bihar"
        },
        {
         "S. No.": 102,
         "DISTRICT": "SUPAUL",
         "STATE": "Bihar"
        },
        {
         "S. No.": 103,
         "DISTRICT": "VAISHALI",
         "STATE": "Bihar"
        },
        {
         "S. No.": 104,
         "DISTRICT": "WEST CHAMPARAN",
         "STATE": "Bihar"
        },
        {
         "S. No.": 105,
         "DISTRICT": "BASTAR",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 106,
         "DISTRICT": "BILASPUR-CG",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 107,
         "DISTRICT": "DANTEWADA",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 108,
         "DISTRICT": "DHAMTARI",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 109,
         "DISTRICT": "DURG",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 110,
         "DISTRICT": "JANJGIR",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 111,
         "DISTRICT": "JASHPUR",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 112,
         "DISTRICT": "KANKER",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 113,
         "DISTRICT": "KAWARDHA\/Kabir Dham",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 114,
         "DISTRICT": "KORBA",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 115,
         "DISTRICT": "KORIYA",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 116,
         "DISTRICT": "MAHASAMUND",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 117,
         "DISTRICT": "RAIGARH-CG",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 118,
         "DISTRICT": "RAIPUR",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 119,
         "DISTRICT": "RAJNANDGAON",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 120,
         "DISTRICT": "SURGUJA (Ambikapur)",
         "STATE": "Chattisgarh"
        },
        {
         "S. No.": 121,
         "DISTRICT": "CHANDIGARH",
         "STATE": "Chandigarh"
        },
        {
         "S. No.": 122,
         "DISTRICT": "Daman",
         "STATE": "Daman & Diu"
        },
        {
         "S. No.": 123,
         "DISTRICT": "DIU",
         "STATE": "Daman & Diu"
        },
        {
         "S. No.": 124,
         "DISTRICT": "Central",
         "STATE": "Delhi"
        },
        {
         "S. No.": 125,
         "DISTRICT": "CITY ZONE",
         "STATE": "Delhi"
        },
        {
         "S. No.": 126,
         "DISTRICT": "Civili Line",
         "STATE": "Delhi"
        },
        {
         "S. No.": 127,
         "DISTRICT": "Karol Bagh",
         "STATE": "Delhi"
        },
        {
         "S. No.": 128,
         "DISTRICT": "Najafgarh",
         "STATE": "Delhi"
        },
        {
         "S. No.": 129,
         "DISTRICT": "NARELA",
         "STATE": "Delhi"
        },
        {
         "S. No.": 130,
         "DISTRICT": "Rohini",
         "STATE": "Delhi"
        },
        {
         "S. No.": 131,
         "DISTRICT": "S. Pahar Ganj",
         "STATE": "Delhi"
        },
        {
         "S. No.": 132,
         "DISTRICT": "Shahadra (N)",
         "STATE": "Delhi"
        },
        {
         "S. No.": 133,
         "DISTRICT": "Shahadra (S)",
         "STATE": "Delhi"
        },
        {
         "S. No.": 134,
         "DISTRICT": "SOUTH",
         "STATE": "Delhi"
        },
        {
         "S. No.": 135,
         "DISTRICT": "West",
         "STATE": "Delhi"
        },
        {
         "S. No.": 136,
         "DISTRICT": "DADRA_&_NAGAR_HAVELI",
         "STATE": "Dadar & Nagar Havali"
        },
        {
         "S. No.": 137,
         "DISTRICT": "GOA",
         "STATE": "Goa"
        },
        {
         "S. No.": 138,
         "DISTRICT": "Ahmedabad",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 139,
         "DISTRICT": "Amreli",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 140,
         "DISTRICT": "Anand",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 141,
         "DISTRICT": "Banaskantha",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 142,
         "DISTRICT": "Bharuch",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 143,
         "DISTRICT": "Bhavnagar",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 144,
         "DISTRICT": "Dahod",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 145,
         "DISTRICT": "Dang",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 146,
         "DISTRICT": "Gandhinagar",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 147,
         "DISTRICT": "Godhara",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 148,
         "DISTRICT": "Jamnagar",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 149,
         "DISTRICT": "Junagadh",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 150,
         "DISTRICT": "Kheda",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 151,
         "DISTRICT": "Kutch",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 152,
         "DISTRICT": "Mahesana",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 153,
         "DISTRICT": "Narmada",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 154,
         "DISTRICT": "Navsari",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 155,
         "DISTRICT": "Patan",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 156,
         "DISTRICT": "Porbandar",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 157,
         "DISTRICT": "Rajkot",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 158,
         "DISTRICT": "Sabarkantha",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 159,
         "DISTRICT": "Surat",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 160,
         "DISTRICT": "Surendranagar",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 161,
         "DISTRICT": "Vadodara",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 162,
         "DISTRICT": "Valsad",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 163,
         "DISTRICT": "Tapi",
         "STATE": "Gujarat"
        },
        {
         "S. No.": 164,
         "DISTRICT": "BILASPUR-HP",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 165,
         "DISTRICT": "CHAMBA",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 166,
         "DISTRICT": "HAMIRPUR-HP",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 167,
         "DISTRICT": "KANGRA",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 168,
         "DISTRICT": "KULLU",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 169,
         "DISTRICT": "MANDI",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 170,
         "DISTRICT": "SHIMLA",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 171,
         "DISTRICT": "SIRMAUR",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 172,
         "DISTRICT": "SOLAN",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 173,
         "DISTRICT": "UNA",
         "STATE": "Himachal Pradesh"
        },
        {
         "S. No.": 174,
         "DISTRICT": "AMBALA",
         "STATE": "Haryana"
        },
        {
         "S. No.": 175,
         "DISTRICT": "BHIWANI",
         "STATE": "Haryana"
        },
        {
         "S. No.": 176,
         "DISTRICT": "FARIDABAD",
         "STATE": "Haryana"
        },
        {
         "S. No.": 177,
         "DISTRICT": "FATEHABAD",
         "STATE": "Haryana"
        },
        {
         "S. No.": 178,
         "DISTRICT": "GURGAON",
         "STATE": "Haryana"
        },
        {
         "S. No.": 179,
         "DISTRICT": "HISAR",
         "STATE": "Haryana"
        },
        {
         "S. No.": 180,
         "DISTRICT": "JHAJJAR",
         "STATE": "Haryana"
        },
        {
         "S. No.": 181,
         "DISTRICT": "JIND",
         "STATE": "Haryana"
        },
        {
         "S. No.": 182,
         "DISTRICT": "KAITHAL",
         "STATE": "Haryana"
        },
        {
         "S. No.": 183,
         "DISTRICT": "KARNAL",
         "STATE": "Haryana"
        },
        {
         "S. No.": 184,
         "DISTRICT": "KURUKSHETRA",
         "STATE": "Haryana"
        },
        {
         "S. No.": 185,
         "DISTRICT": "MEWAT",
         "STATE": "Haryana"
        },
        {
         "S. No.": 186,
         "DISTRICT": "NARNAUL",
         "STATE": "Haryana"
        },
        {
         "S. No.": 187,
         "DISTRICT": "PALWAL",
         "STATE": "Haryana"
        },
        {
         "S. No.": 188,
         "DISTRICT": "PANCHKULA",
         "STATE": "Haryana"
        },
        {
         "S. No.": 189,
         "DISTRICT": "PANIPAT",
         "STATE": "Haryana"
        },
        {
         "S. No.": 190,
         "DISTRICT": "REWARI",
         "STATE": "Haryana"
        },
        {
         "S. No.": 191,
         "DISTRICT": "ROHTAK",
         "STATE": "Haryana"
        },
        {
         "S. No.": 192,
         "DISTRICT": "SIRSA",
         "STATE": "Haryana"
        },
        {
         "S. No.": 193,
         "DISTRICT": "SONIPAT",
         "STATE": "Haryana"
        },
        {
         "S. No.": 194,
         "DISTRICT": "YAMUNANAGAR",
         "STATE": "Haryana"
        },
        {
         "S. No.": 195,
         "DISTRICT": "BOKARO",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 196,
         "DISTRICT": "CHATRA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 197,
         "DISTRICT": "DEOGARH",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 198,
         "DISTRICT": "DHANBAD",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 199,
         "DISTRICT": "DUMKA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 200,
         "DISTRICT": "EAST SINGHBHUM",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 201,
         "DISTRICT": "GARHWA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 202,
         "DISTRICT": "GIRIDIH",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 203,
         "DISTRICT": "GODDA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 204,
         "DISTRICT": "GUMLA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 205,
         "DISTRICT": "HAZARIBAGH",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 206,
         "DISTRICT": "JAMTARA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 207,
         "DISTRICT": "KODARMA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 208,
         "DISTRICT": "LATHEHAR",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 209,
         "DISTRICT": "LOHARDAGA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 210,
         "DISTRICT": "PAKUR",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 211,
         "DISTRICT": "PALAMU",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 212,
         "DISTRICT": "RANCHI",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 213,
         "DISTRICT": "SAHIBGANJ",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 214,
         "DISTRICT": "SARAIKELA-KHARSAWAN",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 215,
         "DISTRICT": "SIMDEGA",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 216,
         "DISTRICT": "WEST SINGHBHUM",
         "STATE": "Jharkhand"
        },
        {
         "S. No.": 217,
         "DISTRICT": "BARAMULA",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 218,
         "DISTRICT": "DODA",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 219,
         "DISTRICT": "JAMMU",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 220,
         "DISTRICT": "KATHUA",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 221,
         "DISTRICT": "KISHTWAR",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 222,
         "DISTRICT": "POONCH",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 223,
         "DISTRICT": "RAJOURI",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 224,
         "DISTRICT": "RAMBAN",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 225,
         "DISTRICT": "REASI",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 226,
         "DISTRICT": "SAMBHA",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 227,
         "DISTRICT": "UDHAMPUR",
         "STATE": "Jammu & Kashmir"
        },
        {
         "S. No.": 228,
         "DISTRICT": "BAGALKOT",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 229,
         "DISTRICT": "BANGALORE RURAL",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 230,
         "DISTRICT": "BANGALORE Urban",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 231,
         "DISTRICT": "BELGAUM",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 232,
         "DISTRICT": "BELLARY",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 233,
         "DISTRICT": "BIDAR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 234,
         "DISTRICT": "BIJAPUR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 235,
         "DISTRICT": "CHAMARAJANAGAR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 236,
         "DISTRICT": "CHIKKABALLAPUR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 237,
         "DISTRICT": "CHIKMAGALUR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 238,
         "DISTRICT": "CHITRADURGA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 239,
         "DISTRICT": "DAKSHINA KANNADA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 240,
         "DISTRICT": "DAVANAGERE",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 241,
         "DISTRICT": "DHARWAD",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 242,
         "DISTRICT": "GADAG",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 243,
         "DISTRICT": "GULBARGA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 244,
         "DISTRICT": "HASSAN",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 245,
         "DISTRICT": "HAVERI",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 246,
         "DISTRICT": "KODAGU",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 247,
         "DISTRICT": "KOLAR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 248,
         "DISTRICT": "KOPPAL",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 249,
         "DISTRICT": "MANDYA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 250,
         "DISTRICT": "MYSORE",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 251,
         "DISTRICT": "RAICHUR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 252,
         "DISTRICT": "RAMANAGARA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 253,
         "DISTRICT": "SHIMOGA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 254,
         "DISTRICT": "TUMKUR",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 255,
         "DISTRICT": "UDUPI",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 256,
         "DISTRICT": "UTTARA_KANNADA",
         "STATE": "Karnataka"
        },
        {
         "S. No.": 257,
         "DISTRICT": "ALAPPUZHA",
         "STATE": "Kerala"
        },
        {
         "S. No.": 258,
         "DISTRICT": "Ernakulam",
         "STATE": "Kerala"
        },
        {
         "S. No.": 259,
         "DISTRICT": "IDUKKI",
         "STATE": "Kerala"
        },
        {
         "S. No.": 260,
         "DISTRICT": "KANNUR",
         "STATE": "Kerala"
        },
        {
         "S. No.": 261,
         "DISTRICT": "KASARAGOD",
         "STATE": "Kerala"
        },
        {
         "S. No.": 262,
         "DISTRICT": "KOLLAM",
         "STATE": "Kerala"
        },
        {
         "S. No.": 263,
         "DISTRICT": "KOTTAYAM",
         "STATE": "Kerala"
        },
        {
         "S. No.": 264,
         "DISTRICT": "KOZHIKODE",
         "STATE": "Kerala"
        },
        {
         "S. No.": 265,
         "DISTRICT": "MALAPPURAM",
         "STATE": "Kerala"
        },
        {
         "S. No.": 266,
         "DISTRICT": "PALAKKAD",
         "STATE": "Kerala"
        },
        {
         "S. No.": 267,
         "DISTRICT": "PATHANAMTHITTA",
         "STATE": "Kerala"
        },
        {
         "S. No.": 268,
         "DISTRICT": "THIRUVANANTHAPURAM",
         "STATE": "Kerala"
        },
        {
         "S. No.": 269,
         "DISTRICT": "THRISSUR",
         "STATE": "Kerala"
        },
        {
         "S. No.": 270,
         "DISTRICT": "WAYANAD",
         "STATE": "Kerala"
        },
        {
         "S. No.": 271,
         "DISTRICT": "LAKSHADWEEP",
         "STATE": "Lakshadweep"
        },
        {
         "S. No.": 272,
         "DISTRICT": "BHOI",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 273,
         "DISTRICT": "EAST GARO HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 274,
         "DISTRICT": "EAST KHASI HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 275,
         "DISTRICT": "JAINTIA HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 276,
         "DISTRICT": "SOUTH GARO HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 277,
         "DISTRICT": "WEST GARO HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 278,
         "DISTRICT": "WEST KHASI HILLS",
         "STATE": "Meghalaya"
        },
        {
         "S. No.": 279,
         "DISTRICT": "AHMEDNAGAR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 280,
         "DISTRICT": "AKOLA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 281,
         "DISTRICT": "AMARAVATI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 282,
         "DISTRICT": "AURANGABAD",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 283,
         "DISTRICT": "BEED",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 284,
         "DISTRICT": "BHANDARA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 285,
         "DISTRICT": "BULDANA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 286,
         "DISTRICT": "CHANDRAPUR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 287,
         "DISTRICT": "DHULE",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 288,
         "DISTRICT": "GADCHIROLI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 289,
         "DISTRICT": "GONDIA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 290,
         "DISTRICT": "HINGOLI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 291,
         "DISTRICT": "JALGAON",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 292,
         "DISTRICT": "JALNA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 293,
         "DISTRICT": "KOLHAPUR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 294,
         "DISTRICT": "LATUR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 295,
         "DISTRICT": "NAGPUR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 296,
         "DISTRICT": "NANDED",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 297,
         "DISTRICT": "NANDURBAR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 298,
         "DISTRICT": "NASIK",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 299,
         "DISTRICT": "OSMANABAD",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 300,
         "DISTRICT": "PARBHANI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 301,
         "DISTRICT": "PUNE",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 302,
         "DISTRICT": "RAIGAD",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 303,
         "DISTRICT": "RATNAGIRI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 304,
         "DISTRICT": "SANGLI",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 305,
         "DISTRICT": "SATARA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 306,
         "DISTRICT": "SINDHUDURG",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 307,
         "DISTRICT": "SOLAPUR",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 308,
         "DISTRICT": "THANE",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 309,
         "DISTRICT": "WARDHA",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 310,
         "DISTRICT": "WASHIM",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 311,
         "DISTRICT": "YAWATMAL",
         "STATE": "Maharashtra"
        },
        {
         "S. No.": 312,
         "DISTRICT": "BISHNUPUR",
         "STATE": "Manipur"
        },
        {
         "S. No.": 313,
         "DISTRICT": "CHANDEL",
         "STATE": "Manipur"
        },
        {
         "S. No.": 314,
         "DISTRICT": "CHURACHANDPUR",
         "STATE": "Manipur"
        },
        {
         "S. No.": 315,
         "DISTRICT": "IMPHAL_EAST",
         "STATE": "Manipur"
        },
        {
         "S. No.": 316,
         "DISTRICT": "IMPHAL_WEST",
         "STATE": "Manipur"
        },
        {
         "S. No.": 317,
         "DISTRICT": "KANGPOKPI",
         "STATE": "Manipur"
        },
        {
         "S. No.": 318,
         "DISTRICT": "SENAPATI",
         "STATE": "Manipur"
        },
        {
         "S. No.": 319,
         "DISTRICT": "TAMENGLONG",
         "STATE": "Manipur"
        },
        {
         "S. No.": 320,
         "DISTRICT": "THOUBAL",
         "STATE": "Manipur"
        },
        {
         "S. No.": 321,
         "DISTRICT": "UKHRUL",
         "STATE": "Manipur"
        },
        {
         "S. No.": 322,
         "DISTRICT": "Anupur",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 323,
         "DISTRICT": "ASHOK NAGAR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 324,
         "DISTRICT": "BALAGHAT",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 325,
         "DISTRICT": "BARWANI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 326,
         "DISTRICT": "BETUL",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 327,
         "DISTRICT": "BHIND",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 328,
         "DISTRICT": "BHOPAL",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 329,
         "DISTRICT": "BURHANPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 330,
         "DISTRICT": "CHHATARPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 331,
         "DISTRICT": "CHHINDWARA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 332,
         "DISTRICT": "DAMOH",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 333,
         "DISTRICT": "DATIA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 334,
         "DISTRICT": "DEWAS",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 335,
         "DISTRICT": "DHAR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 336,
         "DISTRICT": "DINDORI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 337,
         "DISTRICT": "GUNA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 338,
         "DISTRICT": "GWALIOR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 339,
         "DISTRICT": "HARDA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 340,
         "DISTRICT": "HOSHANGABAD",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 341,
         "DISTRICT": "INDORE",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 342,
         "DISTRICT": "JABALPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 343,
         "DISTRICT": "JHABUA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 344,
         "DISTRICT": "KATNI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 345,
         "DISTRICT": "KHANDWA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 346,
         "DISTRICT": "KHARGONE",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 347,
         "DISTRICT": "MANDLA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 348,
         "DISTRICT": "MANDSAUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 349,
         "DISTRICT": "MORENA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 350,
         "DISTRICT": "NARSINGHPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 351,
         "DISTRICT": "NEEMUCH",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 352,
         "DISTRICT": "PANNA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 353,
         "DISTRICT": "RAISEN",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 354,
         "DISTRICT": "RAJGARH",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 355,
         "DISTRICT": "RATLAM",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 356,
         "DISTRICT": "REWA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 357,
         "DISTRICT": "SAGAR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 358,
         "DISTRICT": "SATNA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 359,
         "DISTRICT": "SEONI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 360,
         "DISTRICT": "SHAHDOL",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 361,
         "DISTRICT": "SHAJAPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 362,
         "DISTRICT": "SHEOPUR",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 363,
         "DISTRICT": "SHIVPURI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 364,
         "DISTRICT": "SIDHI",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 365,
         "DISTRICT": "TIKAMGARH",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 366,
         "DISTRICT": "UJJAIN",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 367,
         "DISTRICT": "UMARIA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 368,
         "DISTRICT": "VIDISHA",
         "STATE": "Madhya Pradesh"
        },
        {
         "S. No.": 369,
         "DISTRICT": "Aizawal West",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 370,
         "DISTRICT": "AIZAWL East",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 371,
         "DISTRICT": "CHAMPHAI",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 372,
         "DISTRICT": "KOLASIB",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 373,
         "DISTRICT": "LAWNGTLAI",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 374,
         "DISTRICT": "LUNGLEI",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 375,
         "DISTRICT": "MAMIT",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 376,
         "DISTRICT": "SAIHA",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 377,
         "DISTRICT": "SERCHHIP",
         "STATE": "Mizoram"
        },
        {
         "S. No.": 378,
         "DISTRICT": "DIMAPUR",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 379,
         "DISTRICT": "KIPHIRE",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 380,
         "DISTRICT": "KOHIMA",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 381,
         "DISTRICT": "LONGLENG",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 382,
         "DISTRICT": "MOKOKCHUNG",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 383,
         "DISTRICT": "MON",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 384,
         "DISTRICT": "PEREN",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 385,
         "DISTRICT": "PHEK",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 386,
         "DISTRICT": "TUENSANG",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 387,
         "DISTRICT": "WOKHA",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 388,
         "DISTRICT": "ZUNHEBOTO",
         "STATE": "Nagaland"
        },
        {
         "S. No.": 389,
         "DISTRICT": "ANGUL",
         "STATE": "Orissa"
        },
        {
         "S. No.": 390,
         "DISTRICT": "BALANGIR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 391,
         "DISTRICT": "BALESHWAR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 392,
         "DISTRICT": "BARGARH",
         "STATE": "Orissa"
        },
        {
         "S. No.": 393,
         "DISTRICT": "BAUDH",
         "STATE": "Orissa"
        },
        {
         "S. No.": 394,
         "DISTRICT": "BHADRAK",
         "STATE": "Orissa"
        },
        {
         "S. No.": 395,
         "DISTRICT": "CUTTACK",
         "STATE": "Orissa"
        },
        {
         "S. No.": 396,
         "DISTRICT": "DEBAGARH",
         "STATE": "Orissa"
        },
        {
         "S. No.": 397,
         "DISTRICT": "DHENKANAL",
         "STATE": "Orissa"
        },
        {
         "S. No.": 398,
         "DISTRICT": "GAJAPATI",
         "STATE": "Orissa"
        },
        {
         "S. No.": 399,
         "DISTRICT": "GANJAM",
         "STATE": "Orissa"
        },
        {
         "S. No.": 400,
         "DISTRICT": "JAGATSINGHAPUR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 401,
         "DISTRICT": "JAJPUR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 402,
         "DISTRICT": "JHARSUGUDA",
         "STATE": "Orissa"
        },
        {
         "S. No.": 403,
         "DISTRICT": "KALAHANDI",
         "STATE": "Orissa"
        },
        {
         "S. No.": 404,
         "DISTRICT": "KANDHAMAL",
         "STATE": "Orissa"
        },
        {
         "S. No.": 405,
         "DISTRICT": "KENDRAPARA",
         "STATE": "Orissa"
        },
        {
         "S. No.": 406,
         "DISTRICT": "KEONJHAR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 407,
         "DISTRICT": "KHURDA",
         "STATE": "Orissa"
        },
        {
         "S. No.": 408,
         "DISTRICT": "KORAPUT",
         "STATE": "Orissa"
        },
        {
         "S. No.": 409,
         "DISTRICT": "MALKANGIRI",
         "STATE": "Orissa"
        },
        {
         "S. No.": 410,
         "DISTRICT": "MAYURBHANJ",
         "STATE": "Orissa"
        },
        {
         "S. No.": 411,
         "DISTRICT": "NABARANGAPUR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 412,
         "DISTRICT": "NAYAGARH",
         "STATE": "Orissa"
        },
        {
         "S. No.": 413,
         "DISTRICT": "NUAPADA",
         "STATE": "Orissa"
        },
        {
         "S. No.": 414,
         "DISTRICT": "PURI",
         "STATE": "Orissa"
        },
        {
         "S. No.": 415,
         "DISTRICT": "RAYAGADA",
         "STATE": "Orissa"
        },
        {
         "S. No.": 416,
         "DISTRICT": "SAMBALPUR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 417,
         "DISTRICT": "SONAPUR \/ SUBARNAPUR",
         "STATE": "Orissa"
        },
        {
         "S. No.": 418,
         "DISTRICT": "SUNDARGARH",
         "STATE": "Orissa"
        },
        {
         "S. No.": 419,
         "DISTRICT": "PONDICHERRY",
         "STATE": "Pondicherry"
        },
        {
         "S. No.": 420,
         "DISTRICT": "AMRITSAR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 421,
         "DISTRICT": "BATHINDA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 422,
         "DISTRICT": "BARNALA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 423,
         "DISTRICT": "FARIDKOT",
         "STATE": "Punjab"
        },
        {
         "S. No.": 424,
         "DISTRICT": "FATEGARH SAHIB",
         "STATE": "Punjab"
        },
        {
         "S. No.": 425,
         "DISTRICT": "FIROZPUR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 426,
         "DISTRICT": "GURDASPUR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 427,
         "DISTRICT": "HOSHIARPUR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 428,
         "DISTRICT": "JALANDHAR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 429,
         "DISTRICT": "KAPURTHALA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 430,
         "DISTRICT": "LUDHIANA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 431,
         "DISTRICT": "MANSA-PU",
         "STATE": "Punjab"
        },
        {
         "S. No.": 432,
         "DISTRICT": "MOGA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 433,
         "DISTRICT": "MOHALI\/SASNAGAR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 434,
         "DISTRICT": "MUKATSAR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 435,
         "DISTRICT": "NAWANSHAHR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 436,
         "DISTRICT": "PATIALA",
         "STATE": "Punjab"
        },
        {
         "S. No.": 437,
         "DISTRICT": "RUPNAGAR\/ROPAR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 438,
         "DISTRICT": "SANGRUR",
         "STATE": "Punjab"
        },
        {
         "S. No.": 439,
         "DISTRICT": "TARN_TARAN",
         "STATE": "Punjab"
        },
        {
         "S. No.": 440,
         "DISTRICT": "AJMER",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 441,
         "DISTRICT": "ALWAR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 442,
         "DISTRICT": "BANSWARA",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 443,
         "DISTRICT": "BARAN",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 444,
         "DISTRICT": "BARMER",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 445,
         "DISTRICT": "BHARATPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 446,
         "DISTRICT": "BHILWARA",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 447,
         "DISTRICT": "BIKANER",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 448,
         "DISTRICT": "BUNDI",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 449,
         "DISTRICT": "CHITTAURGARH",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 450,
         "DISTRICT": "CHURU",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 451,
         "DISTRICT": "DAUSA",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 452,
         "DISTRICT": "DHAULPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 453,
         "DISTRICT": "DUNGARPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 454,
         "DISTRICT": "GANGANAGAR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 455,
         "DISTRICT": "HANUMANGARH",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 456,
         "DISTRICT": "JAIPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 457,
         "DISTRICT": "JAISALMER",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 458,
         "DISTRICT": "JALORE",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 459,
         "DISTRICT": "JHALAWAR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 460,
         "DISTRICT": "JHUNJHUNUN",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 461,
         "DISTRICT": "JODHPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 462,
         "DISTRICT": "KARAULI",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 463,
         "DISTRICT": "KOTA",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 464,
         "DISTRICT": "NAGAUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 465,
         "DISTRICT": "PALI",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 466,
         "DISTRICT": "PRATAPGARH",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 467,
         "DISTRICT": "RAJSAMAND",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 468,
         "DISTRICT": "SAWAI_MADHOPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 469,
         "DISTRICT": "SIKAR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 470,
         "DISTRICT": "SIROHI",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 471,
         "DISTRICT": "TONK",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 472,
         "DISTRICT": "UDAIPUR",
         "STATE": "Rajasthan"
        },
        {
         "S. No.": 473,
         "DISTRICT": "EAST",
         "STATE": "Sikkim"
        },
        {
         "S. No.": 474,
         "DISTRICT": "NORTH",
         "STATE": "Sikkim"
        },
        {
         "S. No.": 475,
         "DISTRICT": "SOUTH",
         "STATE": "Sikkim"
        },
        {
         "S. No.": 476,
         "DISTRICT": "WEST",
         "STATE": "Sikkim"
        },
        {
         "S. No.": 477,
         "DISTRICT": "KANCHEEPURAM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 478,
         "DISTRICT": "SAIDAPET",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 479,
         "DISTRICT": "THIRUVALLORE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 480,
         "DISTRICT": "POONAMALLEE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 481,
         "DISTRICT": "VELLORE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 482,
         "DISTRICT": "THIRUPPATTUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 483,
         "DISTRICT": "TIRUVANNAMALAI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 484,
         "DISTRICT": "CHEYYAR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 485,
         "DISTRICT": "CUDDALORE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 486,
         "DISTRICT": "VILLUPURAM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 487,
         "DISTRICT": "KALLAKURICHI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 488,
         "DISTRICT": "THANJAVUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 489,
         "DISTRICT": "THIRUVARUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 490,
         "DISTRICT": "NAGAPATTINAM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 491,
         "DISTRICT": "THIRUCHIRAPALLI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 492,
         "DISTRICT": "KARUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 493,
         "DISTRICT": "PERAMBALUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 494,
         "DISTRICT": "PUDUKOTTAI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 495,
         "DISTRICT": "ARANTHANGI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 496,
         "DISTRICT": "MADURAI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 497,
         "DISTRICT": "THENI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 498,
         "DISTRICT": "DINDIGUL",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 499,
         "DISTRICT": "PALANI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 500,
         "DISTRICT": "RAMANATHAPURAM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 501,
         "DISTRICT": "PARAMAKUDI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 502,
         "DISTRICT": "SIVAGANGA",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 503,
         "DISTRICT": "VIRUDHUNAGAR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 504,
         "DISTRICT": "SIVAKASI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 505,
         "DISTRICT": "THIRUNELVELI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 506,
         "DISTRICT": "SANKARANKOIL",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 507,
         "DISTRICT": "THOOTHUKUDI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 508,
         "DISTRICT": "KOVILPATTI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 509,
         "DISTRICT": "NAGERCOIL",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 510,
         "DISTRICT": "SALEM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 511,
         "DISTRICT": "NAMAKKAL",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 512,
         "DISTRICT": "DHARMAPURI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 513,
         "DISTRICT": "KRISHNAGIRI",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 514,
         "DISTRICT": "COIMBATORE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 515,
         "DISTRICT": "THIRUPPUR",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 516,
         "DISTRICT": "ERODE",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 517,
         "DISTRICT": "DHARAPURAM",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 518,
         "DISTRICT": "THE NILGIRIS",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 519,
         "DISTRICT": "CHENNAI CORP",
         "STATE": "Tamilnadu"
        },
        {
         "S. No.": 520,
         "DISTRICT": "EAST \/DHALAI TRIPURA",
         "STATE": "Tripura"
        },
        {
         "S. No.": 521,
         "DISTRICT": "NORTH_TRIPURA",
         "STATE": "Tripura"
        },
        {
         "S. No.": 522,
         "DISTRICT": "SOUTH_TRIPURA",
         "STATE": "Tripura"
        },
        {
         "S. No.": 523,
         "DISTRICT": "WEST_TRIPURA",
         "STATE": "Tripura"
        },
        {
         "S. No.": 524,
         "DISTRICT": "AGRA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 525,
         "DISTRICT": "ALIGARH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 526,
         "DISTRICT": "ALLAHABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 527,
         "DISTRICT": "AMBEDKAR_NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 528,
         "DISTRICT": "AURAIYA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 529,
         "DISTRICT": "AZAMGARH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 530,
         "DISTRICT": "BAGHPAT",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 531,
         "DISTRICT": "BAHRAICH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 532,
         "DISTRICT": "BALLIA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 533,
         "DISTRICT": "BALRAMPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 534,
         "DISTRICT": "BANDA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 535,
         "DISTRICT": "BARABANKI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 536,
         "DISTRICT": "BAREILLY",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 537,
         "DISTRICT": "BASTI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 538,
         "DISTRICT": "BIJNOR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 539,
         "DISTRICT": "BUDAUN",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 540,
         "DISTRICT": "BULANDSHAHAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 541,
         "DISTRICT": "CHANDAULI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 542,
         "DISTRICT": "CHITRAKOOT",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 543,
         "DISTRICT": "DEORIA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 544,
         "DISTRICT": "ETAH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 545,
         "DISTRICT": "ETAWAH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 546,
         "DISTRICT": "FAIZABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 547,
         "DISTRICT": "FARRUKHABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 548,
         "DISTRICT": "FATEHPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 549,
         "DISTRICT": "FIROZABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 550,
         "DISTRICT": "GAUTAM_BUDH_NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 551,
         "DISTRICT": "GHAZIABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 552,
         "DISTRICT": "GHAZIPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 553,
         "DISTRICT": "GONDA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 554,
         "DISTRICT": "GORAKHPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 555,
         "DISTRICT": "HAMIRPUR-UP",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 556,
         "DISTRICT": "HARDOI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 557,
         "DISTRICT": "HATHRAS\/MAHAMAYANAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 558,
         "DISTRICT": "JALAUN",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 559,
         "DISTRICT": "JAUNPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 560,
         "DISTRICT": "JHANSI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 561,
         "DISTRICT": "JYOTIBA_PHULE_NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 562,
         "DISTRICT": "KANNAUJ",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 563,
         "DISTRICT": "KANPUR NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 564,
         "DISTRICT": "KANPUR_DEHAT",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 565,
         "DISTRICT": "KAUSHAMBI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 566,
         "DISTRICT": "KHERI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 567,
         "DISTRICT": "KUSHINAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 568,
         "DISTRICT": "LALITPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 569,
         "DISTRICT": "LUCKNOW",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 570,
         "DISTRICT": "MAHARAJGANJ",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 571,
         "DISTRICT": "MAHOBA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 572,
         "DISTRICT": "MAINPURI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 573,
         "DISTRICT": "MATHURA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 574,
         "DISTRICT": "MAU",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 575,
         "DISTRICT": "MEERUT",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 576,
         "DISTRICT": "MIRZAPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 577,
         "DISTRICT": "MORADABAD",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 578,
         "DISTRICT": "MUZAFFARNAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 579,
         "DISTRICT": "PILIBHIT",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 580,
         "DISTRICT": "PRATAPGARH",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 581,
         "DISTRICT": "RAEBARELI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 582,
         "DISTRICT": "RAMPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 583,
         "DISTRICT": "SAHARANPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 584,
         "DISTRICT": "SANT_KABIR_NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 585,
         "DISTRICT": "SANT_RAVIDAS_NAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 586,
         "DISTRICT": "SHAHJAHANPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 587,
         "DISTRICT": "SHRAVASTI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 588,
         "DISTRICT": "SIDDHARTHNAGAR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 589,
         "DISTRICT": "SITAPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 590,
         "DISTRICT": "SONBHADRA",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 591,
         "DISTRICT": "SULTANPUR",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 592,
         "DISTRICT": "UNNAO",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 593,
         "DISTRICT": "VARANASI",
         "STATE": "Uttar Pradesh"
        },
        {
         "S. No.": 594,
         "DISTRICT": "ALMORA",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 595,
         "DISTRICT": "BAGESHWAR",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 596,
         "DISTRICT": "CHAMOLI",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 597,
         "DISTRICT": "CHAMPAWAT",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 598,
         "DISTRICT": "DEHRADUN",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 599,
         "DISTRICT": "PAURI GARHWAL",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 600,
         "DISTRICT": "HARDWAR",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 601,
         "DISTRICT": "NAINITAL",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 602,
         "DISTRICT": "PITHORAGARH",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 603,
         "DISTRICT": "RUDRAPRAYAG",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 604,
         "DISTRICT": "TEHRI_GARHWAL",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 605,
         "DISTRICT": "UDHAM SINGH NAGAR",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 606,
         "DISTRICT": "UTTARKASHI",
         "STATE": "Uttrakhand"
        },
        {
         "S. No.": 607,
         "DISTRICT": "BANKURA",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 608,
         "DISTRICT": "BARDDHAMAN",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 609,
         "DISTRICT": "BIRBHUM",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 610,
         "DISTRICT": "COOCH BEHAR",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 611,
         "DISTRICT": "DAKSHIN_DINAJPUR",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 612,
         "DISTRICT": "DARJILING",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 613,
         "DISTRICT": "EAST MEDINIPUR",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 614,
         "DISTRICT": "HAORA \/ HOWRAH",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 615,
         "DISTRICT": "HUGLY",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 616,
         "DISTRICT": "JALPAIGURI",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 617,
         "DISTRICT": "KOLKATA",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 618,
         "DISTRICT": "MALDAH",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 619,
         "DISTRICT": "MURSHIDABAD",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 620,
         "DISTRICT": "NADIA",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 621,
         "DISTRICT": "NORTH_24_PARGANAS",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 622,
         "DISTRICT": "PURULIYA",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 623,
         "DISTRICT": "SOUTH_24_PARGANAS",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 624,
         "DISTRICT": "UTTAR_DINAJPUR",
         "STATE": "West Bengal"
        },
        {
         "S. No.": 625,
         "DISTRICT": "WEST MEDNAPUR",
         "STATE": "West Bengal"
        }
       ]
      const [locations, setLocations] = useState([]);
  const selectedState = watch('state');

  useEffect(() => {
    // Update locations when the selected state changes
    if (selectedState) {
      const stateLocations = jsonData
        .filter((item) => item.STATE === selectedState)
        .map((item) => item.DISTRICT);
      setLocations(stateLocations);
    } else {
      setLocations([]);
    }
  }, [selectedState]);

    const onSubmitHandler = async (data: any) => {
        if (CurrentPage === 1) {
            setCurrentPage(2);
        }
        if (CurrentPage === 2) {
            setLoading(true);
            if (data.password !== data.confirm_password) {
                addToast('Password and Confirm Password do not match', {
                    appearance: 'error',
                    autoDismiss: true,
                });
                setLoading(false);
            } else if (data.password === data.confirm_password) {
                try {
                    await Axios({
                        method: 'post',
                        url: `/users/signup`,
                        data: {
                            fullName: {
                                firstName: data.first_name,
                                lastName: data.last_name,
                            },
                            email: data.email,
                            isConfirmed: false,
                            password: data.password,
                            role: {
                                isCandidate: true,
                                isEmployer: false,
                                isAdmin: false,
                            },
                        },
                    }).then((res) => {
                        setLoading(false);
                        if (res.status === 200 || res.status === 201) {
                            addToast(res.data.message, {
                                appearance: 'success',
                                autoDismiss: true,
                            });
                            Router.push('/login');
                            setTimeout(() => {
                                setCurrentPage(1);
                                reset();
                            }, 3000);
                        }
                    });
                } catch (error: any) {
                    setLoading(false);
                    const errorMessage =
                        error.response && error.response.data
                            ? error.response.data.message
                            : 'An error occurred';
                    addToast(errorMessage, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            }
        }
    };

    const previousHandler = () => {
        if (CurrentPage === 2) {
            setCurrentPage(1);
        }
    };    return (
        <div className={`max-w-md mx-auto shadow px-8 py-10 rounded-lg bg-white relative ${styles.registerForm}`}>
        {/* Process Steps with Progress Bar */}
        <div className={`relative ${styles.processStepsContainer}`}>
            <div className={`${styles.progressBar} ${styles[`progress${CurrentPage - 1}`]}`} />
            <div className={`${styles.processSteps}`}>
                <div className={`${styles.processStep} ${CurrentPage === 1 ? styles.active : ''}`}>
                    <div className={`${styles.stepNumber}`}>1</div>
                    <div className={`${styles.stepName}`}>Step 1</div>
                </div>
                <div className={`${styles.processStep} ${CurrentPage === 2 ? styles.active : ''}`}>
                    <div className={`${styles.stepNumber}`}>2</div>
                    <div className={`${styles.stepName}`}>Step 2</div>
                </div>
            </div>
        </div>

      
            <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1 className={`${styles.color} text-center`}>Register Your Account</h1><br></br>
            {CurrentPage === 1 && (
  <>

    
    <div className="flex gap-6 pt-2 pb-8 w-full">
      <div className="w-6/12 checked:bg-themePrimary text-[#fff]">
        <input
          type="radio"
          id="freelancer-radio"
          defaultValue="candidate"
          className="hidden absolute"
          {...register('freelancer_role', { defaultValue: 'candidate' })}
          defaultChecked
        />
        <label
          htmlFor="freelancer-radio"
          className="bg-themePrimary/20 w-full text-themeDark hover:bg-themePrimary/30 duration-300 ease-in-out hover:text-themePrimary px-3 py-2.5 text-center cursor-pointer rounded"
        >
          Candidate
        </label>
      </div>
    </div>
    
    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            First Name
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.first_name ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="name"
            {...register('first_name', { required: true })}
          />
          {errors?.first_name && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Last Name
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.last_name ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="name"
            {...register('last_name', { required: true })}
          />
          {errors?.last_name && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Email
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
              errors?.email ? '!border-red-500' : 'border-gray'
            } focus:ring-themePrimary focus:ring-opacity-50`}
            type="name"
            {...register('email', { required: true })}
          />
          {errors?.email && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Phone Number
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border rounded-lg placeholder-coolGray-400 focus:outline-none focus:ring-2 ${
              errors?.phone_number ? '!border-red-500' : 'border-gray'
            } focus:ring-themePrimary focus:ring-opacity-50`}
            type="tel"
            {...register('phone_number', { required: true })}
          />
          {errors?.phone_number && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
      </div>
    </div>

    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Password
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.password ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'This field is required',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            placeholder="Enter Password"
          />
          {errors?.password && (
            <span className="text-red-600 text-xss italic">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-themeDarker" htmlFor="">
            Confirm Password
          </label>
          <input
            className={`appearance-none block w-full !p-2 leading-5 text-coolGray-900 border ${
              errors?.confirm_password ? '!border-red-500' : 'border-gray'
            } rounded-lg placeholder-coolGray-400 focus:outline-none`}
            type="password"
            {...register('confirm_password', {
              required: {
                value: true,
                message: 'This field is required',
              },
              validate: (value) => {
                return (
                  value === watch('password') ||
                  'Passwords do not match'
                );
              },
            })}
            placeholder="Enter Confirm Password"
          />
          {errors?.confirm_password && (
            <span className="text-red-600 text-xss italic">
              {errors?.confirm_password?.message}
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="mb-6">
      <div className="flex gap-6">
        <div className="w-1/2">
         
       
      <select {...register('state', { required: true })}>
        <option value="">Select State</option>
        {[...new Set(jsonData.map((item) => item.STATE))].map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

       {errors.state && <span>This field is required</span>}
        </div>
        <div className="w-1/2">
       
          
      <select {...register('location', { required: true })}>
        <option value="">Select District</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
        </select>
          {errors?.location && (
            <span className="text-red-600 text-xss italic">
              This field is required
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Rest of your form fields */}
  </>
)}



   
{/* Phone Number Verification Section Styling */}
{CurrentPage === 2 && (
        <div className="mt-8">
          <p className="text-lg font-semibold mb-4 text-coolGray-800">Phone Number Verification</p>
          <div className="flex items-center justify-center">
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="py-2 px-4 border border-coolGray-300 rounded-md mr-4 focus:outline-none focus:ring focus:border-themePrimary"
            />
            <button
              onClick={handleSendOTP} // Call the defined handleSendOTP function
              className="py-2 px-6 bg-themePrimary text-white rounded-md hover:bg-black focus:outline-none focus:ring focus:border-themePrimary"
            >
              Send OTP
            </button>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex items-center justify-center mt-4">
            {[1, 2, 3, 4].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border border-coolGray-300 rounded-md mx-1 focus:outline-none focus:ring focus:border-themePrimary"
              />
            ))}
          </div>
                <br></br>
            </div>
      
)}

{/* Buttons */}<br></br>
<div className="flex gap-4">
    {CurrentPage === 2 && (
        <button
            onClick={previousHandler}
            className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
        >
            Previous
        </button>
    )}
    <button
        type="submit"
        disabled={loading}
        className="inline-block !py-3 px-7 mb-6 w-full duration-300 ease-in-out text-base text-white font-normal text-center leading-6 bg-themePrimary rounded-md hover:bg-black"
    >
        {CurrentPage === 1 ? 'Next' : <>{loading ? 'Please wait...' : 'Sign Up'}</>}
    </button>
</div>

<p className="text-center">
    <span className="text-xss1 text-deep">
        Already have an account?
    </span>
    <Link href="/login">
        <a className="inline-block text-xss1 text-themePrimary hover:text-green-700 hover:underline ml-4">
            Log In
        </a>
    </Link>
</p>


            </form>
        </div>
    );
};

export default form;
