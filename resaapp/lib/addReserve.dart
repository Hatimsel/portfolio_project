import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:resaapp/controller/conx.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:resaapp/app/auth/login.dart';

enum StatusType { Confirme, En_attente, Refuse }

class AddNew extends StatefulWidget {
  const AddNew({Key? key}) : super(key: key);

  @override
  _AddNewState createState() => _AddNewState();
}

class _AddNewState extends State<AddNew> {
  final storage = FlutterSecureStorage();

  TextEditingController adults = TextEditingController();
  TextEditingController enfants = TextEditingController();
  TextEditingController note = TextEditingController();
  TextEditingController dateController = TextEditingController();
  TextEditingController timeController = TextEditingController();

 // StatusType? _selectedType;
  DateTime? selectedDate;
  TimeOfDay? selectedTime;
  String? userId;

  Future<String?> getUserId() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('user_id');
  }

  @override
   void initState() {
    super.initState();
    Future.delayed(Duration.zero, () async {
      await getUserId().then((fetchedUserId) {
        setState(() {
          userId = fetchedUserId;
        });
      });
    });
  }
  void _selectTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: selectedTime ?? TimeOfDay.now(),
      helpText: 'SÉLECTIONNER L\'HEURE', 
cancelText: 'ANNULER', 
confirmText: 'SÉLECTIONNER', 
      builder: (BuildContext context, Widget? child) {
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true), // Force 24-hour format
          child: child!,
        );
      },
    );
    if (picked != null && picked != selectedTime) {
      setState(() {
        selectedTime = picked;
        timeController.text = picked.format(context);
      });
    }
  }
/*
  void _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2025),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        dateController.text = DateFormat('dd/MM/yyyy').format(picked);
      });
    }
  }
  */
   void _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2025),
      helpText: 'SÉLECTIONNER LA DATE', 
      cancelText: 'ANNULER', 
      confirmText: 'SÉLECTIONNER', 
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
dateController.text = DateFormat('dd MMMM yyyy',).format(picked);      });
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (context) => Login()));
            },
          ),
        ],
        elevation: 10,
        leadingWidth: 80,
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 15.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Ajouter une nouvelle réservation :",
                style: TextStyle(
                    fontSize: 25,
                    color: Colors.white,
                    fontStyle: FontStyle.italic,
                    fontFamily: "Lora"),
              ),
              SizedBox(height: 10),
              buildTextFormField(adults, "Adultes :", "Adultes :"),
              SizedBox(height: 10),
              buildTextFormField(enfants, "Enfants :" , "Enfants :"),
              SizedBox(height: 20),
              buildDateTimeFormField(dateController, "Date de réservation :", _selectDate),
              SizedBox(height: 10),
              buildDateTimeFormField(timeController, "Heure de réservation :", _selectTime),
              SizedBox(height: 20),
            //  buildStatusDropdown(),
              SizedBox(height: 20),
              buildNoteField("Note :"),
              SizedBox(height: 20),
              buildSubmitButton(),
              SizedBox(height: 80),
            ],
          ),
        ),
      ),
    );
  }
/*
  Widget buildDateTimeFormField(TextEditingController controller, String label, Function() onTap) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        icon: Icon(Icons.calendar_today),
        labelText: label,
        filled: true,
        fillColor: Colors.black45,
        labelStyle: TextStyle(color: Colors.white),
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.white),
          borderRadius: BorderRadius.circular(20),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.blue),
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      readOnly: true,
      onTap: onTap,
      style: TextStyle(color: Colors.white),
    );
  }
*/
Widget buildDateTimeFormField(TextEditingController controller, String label, Function(BuildContext) onSelect) {
  return TextFormField(
    controller: controller,
    decoration: InputDecoration(
      labelText: label,
      filled: true,
      fillColor: Colors.black45,
      labelStyle: TextStyle(color: Colors.white),
      enabledBorder: OutlineInputBorder(
        borderSide: BorderSide(color: Colors.white),
        borderRadius: BorderRadius.circular(20),
      ),
      focusedBorder: OutlineInputBorder(
        borderSide: BorderSide(color: Colors.blue),
        borderRadius: BorderRadius.circular(20),
      ),
    ),
    readOnly: true,
    onTap: () => onSelect(context), // Wrap the function to match the expected signature
    style: TextStyle(color: Colors.white),
  );
}
/*
  Widget buildStatusDropdown() {
    return Row(
      children: [
        Text("Status : ",
            style: TextStyle(
                fontSize: 25,
                color: Colors.white,
                fontStyle: FontStyle.italic,
                fontFamily: "Lora")),
        DropdownButton<StatusType>(
          value: _selectedType,
          onChanged: (value) {
            setState(() => _selectedType = value);
          },
          items: StatusType.values.map((type) {
            return DropdownMenuItem<StatusType>(
              value: type,
              child: Text(
                type == StatusType.Confirme
                    ? "Confirmé"
                    : type == StatusType.En_attente
                        ? "En attente"
                        : "Refusé",
                style: TextStyle(
                    fontSize: 25,
                    color: Color.fromARGB(255, 246, 244, 244),
                    fontStyle: FontStyle.italic,
                    fontFamily: "Lora"),
              ),
            );
          }).toList(),
          dropdownColor: Colors.black,
        ),
      ],
    );
  }*/
  Widget buildNoteField(String label) {
    return TextField(
      maxLines: null,
      controller: note,
      style: const TextStyle(
          fontSize: 25, color: Colors.white, fontFamily: "Lora"),
      decoration: InputDecoration(
        labelText: label,
        fillColor: Colors.black,
        filled: true,
        hintText: 'Note ...',
        hintStyle: TextStyle(color: Colors.white),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(20),
borderSide: const BorderSide(color: Color.fromARGB(255, 250, 42, 0), width: 10),
      ),
      )
    );
  }

  Widget buildSubmitButton() {
    return MaterialButton(
      onPressed: () async {
        if (userId == null || selectedDate == null || selectedTime == null) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Veuillez remplir tous les champs requis.")));
          return;
        }
        String formattedDate = DateFormat('yyyy-MM-dd').format(selectedDate!);
        String formattedTime = selectedTime!.format(context);

        Map<String, String> reservationData = {
          "userId": userId!,
          "date": "$formattedDate $formattedTime",
          "adults": adults.text,
          "enfants": enfants.text,
          "hours": formattedTime,
          "note": note.text,
       //   "status": _selectedType == StatusType.Confirme ? "Confirmé" : _selectedType == StatusType.En_attente ? "En attente" : "Refusé",
        };

        try {
          bool success = await submitreservation(
            userId: reservationData['userId']!,
            date: reservationData['date'].toString(),
            adults: reservationData['adults']!,
            enfants: reservationData['enfants']!,
            hours: reservationData['hours'].toString(),
            note: reservationData['note']!,
       //     status: reservationData['status']!,
          );
          if (success) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Réservation ajoutée avec succès !")));
          } else {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Échec de l'ajout de la réservation.")));
          }
        } catch (e) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Une erreur s'est produite : ${e.toString()}")));
        }
      },
      color: Color.fromRGBO(252, 252, 251, 1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      minWidth: 400.0,
      height: 80.0,
      child: const Text("Ajouter", style: TextStyle(fontSize: 25, color: Color.fromARGB(255, 5, 4, 4), fontFamily: "Lora", fontWeight: FontWeight.bold)),
    );
  }

  Widget buildTextFormField(TextEditingController controller, String hintText ,String label) {
    return SizedBox(
      width: 400,
      height: 70,
      child: TextFormField(
        style: const TextStyle(
            fontSize: 25,
            color: Color.fromARGB(255, 251, 250, 250),
            fontFamily: "Lora"),
        controller: controller,
        decoration: InputDecoration(
                labelText: label,

          fillColor: Colors.black,
          filled: true,
          hintText: hintText,
          hintStyle: TextStyle(color: Colors.white),
          border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(20),
              borderSide: const BorderSide(color: Colors.blue, width: 10)),
        ),
      ),
    );
  }
}
