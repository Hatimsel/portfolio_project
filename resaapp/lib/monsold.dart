import 'package:flutter/material.dart';
import 'package:resaapp/app/auth/login.dart';
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart'; 


class Reservation {
  final int numberOfPeople;
  final DateTime date;
  final double revenue;
  final int id;

  Reservation(this.id, this.numberOfPeople, this.date, this.revenue);
}

class ConsultBalancePage extends StatefulWidget {
  const ConsultBalancePage({Key? key}) : super(key: key);

  @override
  State<ConsultBalancePage> createState() => _ConsultBalancePageState();
}

class _ConsultBalancePageState extends State<ConsultBalancePage> {
  List<Reservation> reservations = [
     Reservation(5, 6, DateTime(2023, 12, 20), 3800.0),
 Reservation(6, 9, DateTime(2023, 12, 2), 700.0),
    Reservation(1, 4, DateTime(2024, 4, 10), 2060),
    Reservation(2, 2, DateTime(2024, 4, 12), 1590.0),
    Reservation(3, 3, DateTime(2024, 5, 5), 1390.0),
    Reservation(4, 5, DateTime(2024, 5, 12), 12050.0),
   
   
  ];

  Map<String, List<Reservation>> groupedReservations = {};

  @override
  void initState() {
    super.initState();
    groupReservationsByMonth();
    initializeDateFormatting('fr_FR', null).then((_) => groupReservationsByMonth());  // Initialize French locale

  }

  void groupReservationsByMonth() {
    for (var reservation in reservations) {
      String monthKey = DateFormat('yyyy-MM').format(reservation.date);
      if (!groupedReservations.containsKey(monthKey)) {
        groupedReservations[monthKey] = [];
      }
      groupedReservations[monthKey]!.add(reservation);
    }
  }

  double getTotalRevenue(List<Reservation> reservations) {
    return reservations.fold(0.0, (sum, reservation) => sum + reservation.revenue);
  }

  double getCommission(double totalRevenue) {
    return totalRevenue * 0.10; 
  }
String formatMonth(String date) {
  return DateFormat('MMMM yyyy', 'fr_FR').format(DateFormat('yyyy-MM').parse(date));
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Consultation du Solde'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Login()));
            },
          ),
        ],
        elevation: 10,
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 15.0),
        child: SingleChildScrollView(
          child: Column(
            children: groupedReservations.entries.map((entry) {
              double totalRevenue = getTotalRevenue(entry.value);
              double commission = getCommission(totalRevenue);
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: EdgeInsets.all(8),
                    color: Color.fromARGB(255, 246, 243, 246),
                    width: double.infinity,
                    child: Text(
                      DateFormat('MMMM yyyy').format(DateFormat('yyyy-MM').parse(entry.key)),
                      style: TextStyle(color: const Color.fromARGB(255, 10, 10, 10), fontWeight: FontWeight.bold, fontSize: 20),
                    ),
                  ),
                  Table(
                    border: TableBorder.all(color: const Color.fromARGB(255, 255, 255, 255)),
                    columnWidths: const {
                      1: FixedColumnWidth(100.0),
                      2: FixedColumnWidth(100.0),
                      3: FixedColumnWidth(120.0),
                    },
                    children: [
                      TableRow(children: [
                        Padding(padding: EdgeInsets.all(8), child: Text("Nombre de Personnes", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white))),
                        Padding(padding: EdgeInsets.all(8), child: Text("Le Jour", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white))),
                        Padding(padding: EdgeInsets.all(8), child: Text("La note ", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white))),
                      ]),
                      ...entry.value.map((reservation) => TableRow(
                        children: [
                          Padding(padding: EdgeInsets.all(8), child: Text(reservation.numberOfPeople.toString(), style: TextStyle(color: Colors.white))),
                          Padding(padding: EdgeInsets.all(8), child: Text("${reservation.date.day}" , style: TextStyle(color: Colors.white))),
                          Padding(padding: EdgeInsets.all(8), child: Text("${reservation.revenue.toStringAsFixed(0)} DHS",  style: TextStyle(color: Colors.white))),
                        ],
                      )).toList(),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8.0, left: 16.0),
                    child: Text("Revenu Total: ${totalRevenue.toStringAsFixed(2)} DHS", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.green)),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 4.0, left: 16.0, bottom: 16.0),
                    child: Text("Commission (10%): ${commission.toStringAsFixed(2)} DHS", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.yellow)),
                  ),
                ],
              );
            }).toList(),
          ),
        ),
      ),  
    );
  }
}
