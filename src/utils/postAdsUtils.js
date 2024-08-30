const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const yearNow = new Date().getFullYear();

export const getMonth = () => {
    const currentMonthIndex = new Date().getMonth();
    const newMonths = months.slice(currentMonthIndex + 1);
    const upcommingMonths = newMonths.map(month => {
        return month + ", " + yearNow
    })
    return upcommingMonths
}

export const bdDistricts = {
    "Dhaka": ['Dhaka', 'Tangail', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Narayanganj', 'Shariatpur'],
    "Chattogram": ['Chattogram', "Cox's Bazar", 'Chandpur', 'Comilla', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
    "Rajshahi": ['Rajshahi', 'Bogura', 'Jaipurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Sirajganj'],
    "Khulna": ['Khulna', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
    "Barishal": ['Barishal', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur', 'Barguna'],
    "Sylhet": ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
    "Rangpur": ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh'],
    "Mymensingh": ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
  };
      

export const bdAreas = {
        "Chattogram": {
            "Comilla": ["Debidwar", "Barura", "Brahmanpara", "Chandina", "Chauddagram", "Daudkandi", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Comilla Sadar", "Meghna", "Monohargonj", "Sadar Dakshin", "Titas", "Burchang", "Lalmai"],
            "Feni": ["Chhagalnaiya", "Feni Sadar", "Sonagazi", "Phulgazi", "Parshuram", "Daganbhuiyan"],
            "Brahmanbaria": ["Brahmanbaria Sadar", "Kasba", "Nabinagar", "Sarail", "Ashuganj", "Akhaura", "Nasirnagar", "Banchharampur", "Vijaynagar"],
            "Rangamati": ["Rangamati Sadar", "Kaptai", "Kaukhali", "Baghai Chhari", "Barkal", "Langadu", "Rajasthali", "Bilaichhari", "Jurachhari", "Naniarchar"],
            "Noakhali": ["Noakhali", "Companiganj", "Begumganj", "Hatia", "Subarnachar", "Kabirhat", "Senbag", "Chatkhil", "Sonaimuri"],
            "Chandpur": ["Haimchar", "Kachua", "Shahrasti", "Chandpur Sadar", "Matlab", "Haziganj", "Faridganj"],
            "Lakshmipur": ["Lakshmipur Sadar", "Companiganj", "Ramganj", "Ramgati"],
            "Chattogram": ["Rangunia", "Sitakunda", "Mirsharai", "Patiya", "Sandwip", "Banskhali", "Boalkhali", "Anwara", "Chandanaish", "Satkania", "Lohagara", "Hathazari", "Fatikchhari", "Raozan", "Karnaphuli"],
            "Cox's Bazar": ["Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Ukhia", "Maheshkhali", "Pekua", "Ramu", "Teknaf"],
            "Khagrachari": ["Khagrachari Sadar", "Dighinala", "Panchhari", "Laxmichhari", "Mahalchhari", "Manikchhari", "Ramgarh", "Matiranga", "Guimara"],
            "Bandarban": ["Bandarban Sadar", "Alikadam", "Naikhongchhari", "Rowangchhari", "Lama", "Ruma", "Thanchi"]
          },
        "Rajshahi": {
            "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj", "Tarash", "Ullapara"],
            "Pabna": ["Sujanagar", "Ishwardi", "Bhangura", "Pabna Sadar", "Bera", "Atgharia", "Chatmohar", "Sathia", "Faridpur"],
            "Bogura": ["Kahaloo", "Bogra Sadar", "Sariakandi", "Shajahanpur", "Dupchanchia", "Adamdighi", "Nandigram", "Sonatala", "Dhunat", "Gabtali", "Sherpur", "Shibganj"],
            "Rajshahi": ["Paba", "Durgapur", "Mohonpur", "Charghat", "Puthia", "Bagha", "Godagari", "Tanore", "Bagmara"],
            "Natore": ["Natore Sadar", "Singra", "Baraigram", "Bagatipara", "Lalpur", "Gurudaspur", "Naldanga"],
            "Joypurhat": ["Akklipur", "Kalai", "Khetlal", "Panchbibi", "Joypurhat Sadar"],
            "Chapainawabganj": ["Bholahat", "Chapai Nawabganj Sadar", "Gomastapur", "Nachole", "Rohanpur", "Shibganj"]
          },
        "Khulna": {
            "Khulna": ["Khulna Sadar", "Daulatpur", "Khan Jahan Ali", "Sonadanga"],
            "Satkhira": ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Satkhira Sadar"],
            "Jashore": ["Jashore Sadar", "Jhikargachha", "Bagherpara", "Chaugachha", "Keshabpur", "Manirampur", "Abhaynagar"],
            "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Rampal"],
            "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
          },
        "Barishal": {
            "Barishal": ["Barishal Sadar", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
            "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
            "Patuakhali": ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
            "Pirojpur": ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nesarabad (Swarupkathi)", "Pirojpur Sadar", "Zianagar"],
        },
        "Sylhet": {
            "Sylhet": ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Dakshin Surma", "Fenchuganj", "Golapganj", "Jaintiapur", "Kanaighat", "Zakiganj"],
            "Moulvibazar": ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
            "Habiganj": ["Habiganj Sadar", "Ajmiriganj", "Baniachang", "Bahubal", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj"],
            "Sunamganj": ["Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharmapasha", "Jamalganj", "Sunamganj Sadar", "Tahirpur"],
        },
        "Dhaka": {
            "Dhaka": ["Dhaka Sadar", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Tongi", "Mirpur", "Turag"],
            "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
            "Narayanganj": ["Narayanganj Sadar", "Araihazar", "Bandar", "Fatullah", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
            "Tangail": ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
        },
        "Rangpur": {
            "Rangpur": ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Rangpur Sadar", "Taraganj"],
            "Dinajpur": ["Dinajpur Sadar", "Birampur", "Birganj", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Khansama", "Nawabganj", "Parbatipur"],
            "Kurigram": ["Kurigram Sadar", "Bhurungamari", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Rowmari", "Ulipur"],
            "Lalmonirhat": ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
        },
        "Mymensingh": {
            "Mymensingh": ["Mymensingh Sadar", "Bhaluka", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Trishal"],
            "Jamalpur": ["Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
            "Netrokona": ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Netrokona Sadar", "Purbadhala"],
            "Sherpur": ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],
        },
  };