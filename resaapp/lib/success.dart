import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:resaapp/constant/linkapi.dart';

class Reservation {
  
  final int numberOfPeople;
  final DateTime date;
  final double revenue;

  Reservation(
      {
      required this.numberOfPeople,
      required this.date,
      required this.revenue
      });
      @override
  String toString() {
    return 'Reservation(numberOfPeople: $numberOfPeople, date: $date, revenue: $revenue)';
  }




  factory Reservation.fromJson(Map<String, dynamic> json) {
  print("JSON Data: $json"); 
  double parsedRevenue = 3.0;
  DateTime parsedDate = DateTime.now();

  try {
  } catch (e) {
    print("Error parsing ID: ${e.toString()}");
  }

  try {

if (json['date'] != null)
    parsedRevenue = double.tryParse(json['revenue'].toString()) ?? 0.0;
  } catch (e) {
    print("Error parsing Revenue: ${e.toString()}");
  }

  try {
    if (json['date'] != null) {
      parsedDate = DateTime.parse(json['date']);
    }
  } catch (e) {
    print("Error parsing Date: ${e.toString()}");
  }

  return Reservation(
    numberOfPeople: json['numberOfPeople'] ?? 0,
    date: parsedDate,
    revenue: parsedRevenue,
  );
}

}

class ReservationListPage extends StatefulWidget {
  final String userId;

  const ReservationListPage({Key? key, required this.userId}) : super(key: key);

  @override
  _ReservationListPageState createState() => _ReservationListPageState();
}

class _ReservationListPageState extends State<ReservationListPage> {
  Future<List<Reservation>> fetchReservations() async {
    var url =
        Uri.parse('$linkServerName/api/reservations?userId=${widget.userId}');
    var response = await http.get(url);

    print('API Response: ${response.body}');

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((json) => Reservation.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load reservations');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Reservations'),
      ),
      body: FutureBuilder<List<Reservation>>(
        future: fetchReservations(),
        builder: (context, snapshot) {
  if (snapshot.connectionState == ConnectionState.waiting) {
    return Center(child: CircularProgressIndicator());
  } else if (snapshot.hasError) {
    return Center(child: Text("Error: ${snapshot.error}"));
  } else if (snapshot.data == null || snapshot.data!.isEmpty) {
    return Center(child: Text("No reservations found"));
  } else {
    print("FutureBuilder Snapshot Data:");
    return ListView(
      children: snapshot.data!
        .map((reservation) => ReservationWidget(reservation: reservation))
        .toList(),
    );
  }
},
    
        
      ),

    );
  }
}

class ReservationWidget extends StatelessWidget {
  final Reservation reservation;

  const ReservationWidget({Key? key, required this.reservation})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text("Reservation ID: ",
          style: TextStyle(fontSize: 20, color: Colors.yellowAccent)),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Date: ${DateFormat('yyyy-MM-dd').format(reservation.date)},",
              style: TextStyle(fontSize: 20, color: Colors.yellowAccent)),
          Text("Number of People: ${reservation.numberOfPeople}",
              style: TextStyle(fontSize: 20, color: Colors.yellowAccent)),
          Text("Revenue: \$${reservation.revenue.toStringAsFixed(2)}",
              style: TextStyle(fontSize: 20, color: Colors.yellowAccent)),
        ],
      ),
      isThreeLine: true,
    );
  }
}
