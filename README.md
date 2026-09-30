# 🅿️ Smart Parking Management System

A full-stack, beginner-friendly web application designed to automate parking slot discovery, online reservations, user management, and administrative monitoring. Built with **Spring Boot (Java 21)** on the backend, **MySQL** database, and **React.js** on the frontend.

---

## 🎯 Project Objective

The goal of this application is to solve urban parking congestion by providing a real-time digital parking management solution. It allows users to view slot availability, reserve a slot for a specific date and time, track active bookings, and cancel reservations. Administrators gain a centralized dashboard to monitor parking lot occupancy and manage slots and registered users.

---

## 🏗️ System Architecture

```
+-------------------------------------------------------------------------+
|                              CLIENT BROWSER                             |
|                        (React.js Single Page App)                       |
|                             http://localhost:3000                       |
+------------------------------------+------------------------------------+
                                     |
                                     | Axios HTTP (JSON REST API)
                                     v
+------------------------------------+------------------------------------+
|                         SPRING BOOT BACKEND                             |
|                              http://localhost:8080                      |
|                                                                         |
|  [REST Controllers]  -->  [Service Layer]  -->  [Spring Data JPA Repos] |
|  - AuthController         - UserService         - UserRepository        |
|  - ParkingSlotController  - ParkingSlotService  - ParkingSlotRepository |
|  - BookingController      - BookingService      - BookingRepository     |
|  - AdminController        - AdminService                                |
+------------------------------------+------------------------------------+
                                     |
                                     | JDBC Connection (Port 3306)
                                     v
+------------------------------------+------------------------------------+
|                           MYSQL DATABASE                                |
|                           (smart_parking)                               |
|                                                                         |
|             +--------------+   1:N   +------------------+               |
|             |    users     |<------->|     bookings     |               |
|             +--------------+         +------------------+               |
|                                               ^                         |
|                                               | 1:N                     |
|                                      +------------------+               |
|                                      |  parking_slots   |               |
|                                      +------------------+               |
+-------------------------------------------------------------------------+
```

---

## ✨ Features

### 👤 User Module
- **User Registration & Login**: Full Name, Email, Password, Phone Number, Vehicle Number.
- **Interactive User Dashboard**: View total, available, occupied, and booked slots.
- **Slot Discovery & Filtering**: Grid layout of parking slots filtered by availability (`AVAILABLE`, `BOOKED`, `OCCUPIED`) and floor location (`Ground Floor`, `First Floor`, `Second Floor`).
- **Slot Booking**: Select available slots, specify date, start time, and end time.
- **Booking Receipts**: Real-time confirmation ticket with printable receipt.
- **Booking Management**: View active and historical bookings, cancel active reservations.

### 🛡️ Admin Module
- **Admin Authentication**: Dedicated admin login portal (`admin@smartparking.com` / `admin123`).
- **Admin Statistics Dashboard**: Cards displaying total slots (18), available slots, booked slots, occupied slots, total registered users, and total bookings.
- **Manage Parking Slots**: Add new slots, edit slot attributes, delete slots, or manually override slot status.
- **Manage All Bookings**: View and search all system bookings with real-time status tracking and cancellation control.
- **User Directory**: View registered customer accounts, phone numbers, and vehicle details.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js 18 (Vite build system) |
| **Routing & Navigation** | React Router DOM v6 |
| **HTTP Client** | Axios |
| **Icons & Styling** | Lucide React, Custom Modern Glassmorphic CSS |
| **Backend Framework** | Java 21, Spring Boot 3.2 |
| **REST APIs** | Spring Web MVC |
| **Persistence / ORM** | Spring Data JPA (Hibernate) |
| **Database** | MySQL 8.0+ |
| **Build Tools** | Maven Wrapper (`mvnw`), npm |

---

## 🗄️ Database Schema & Entities

### 1. User Entity (`users`)
- `id` (Long, Primary Key, Auto-Increment)
- `name` (String, Not Null)
- `email` (String, Unique, Not Null)
- `password` (String, Not Null)
- `phone` (String)
- `vehicleNumber` (String)
- `role` (Enum: `USER`, `ADMIN`)
- `createdAt` (Timestamp)

### 2. ParkingSlot Entity (`parking_slots`)
- `id` (Long, Primary Key, Auto-Increment)
- `slotNumber` (String, Unique, Not Null) - *e.g., A1, A2, B1*
- `vehicleType` (String) - *e.g., Car, SUV, Bike*
- `status` (Enum: `AVAILABLE`, `BOOKED`, `OCCUPIED`)
- `floor` (String) - *e.g., Ground Floor, First Floor*

### 3. Booking Entity (`bookings`)
- `id` (Long, Primary Key, Auto-Increment)
- `user_id` (Foreign Key -> `users.id`)
- `parking_slot_id` (Foreign Key -> `parking_slots.id`)
- `vehicleNumber` (String, Not Null)
- `bookingDate` (LocalDate, Not Null)
- `startTime` (LocalTime, Not Null)
- `endTime` (LocalTime, Not Null)
- `status` (Enum: `ACTIVE`, `COMPLETED`, `CANCELLED`)
- `createdAt` (Timestamp)

---

## 📡 REST API Documentation

### Authentication APIs
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Authenticate user/admin credentials |

### Parking Slot APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/parking-slots` | Fetch all parking slots |
| `GET` | `/api/parking-slots/available` | Fetch only available parking slots |
| `GET` | `/api/parking-slots/{id}` | Fetch slot details by ID |
| `POST` | `/api/parking-slots` | Create a new parking slot (Admin) |
| `PUT` | `/api/parking-slots/{id}` | Update parking slot details (Admin) |
| `PUT` | `/api/parking-slots/{id}/status?status=...` | Override slot status (Admin) |
| `DELETE` | `/api/parking-slots/{id}` | Delete a parking slot (Admin) |

### Booking APIs
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Reserve a parking slot |
| `GET` | `/api/bookings/user/{userId}` | Get bookings for a specific user |
| `GET` | `/api/bookings` | Get all system bookings (Admin) |
| `GET` | `/api/bookings/{id}` | Get booking details by ID |
| `PUT` | `/api/bookings/{id}/cancel` | Cancel an active booking |

### Admin APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Get real-time parking & system statistics |
| `GET` | `/api/admin/users` | Get directory of all registered users |

---

## 📁 Project Structure

```
smart-parking-management/
│
├── backend/
│   ├── src/main/java/com/smartparking/
│   │   ├── config/              # WebConfig (CORS), DataInitializer
│   │   ├── controller/          # Auth, User, Slot, Booking, Admin REST Controllers
│   │   ├── dto/                 # Request/Response Data Transfer Objects
│   │   ├── entity/              # JPA Entities (User, ParkingSlot, Booking) & Enums
│   │   ├── exception/           # GlobalExceptionHandler & Custom Exceptions
│   │   ├── repository/          # Spring Data JPA Repositories
│   │   └── service/             # Business Logic Layer
│   ├── src/main/resources/
│   │   └── application.properties # Spring Boot & MySQL configuration
│   ├── pom.xml                  # Maven dependencies configuration
│   └── mvnw.cmd                 # Maven wrapper executable script
│
└── frontend/
    ├── src/
    │   ├── components/          # Navbar, Footer, ParkingSlotCard, BookingCard, DashboardCard, ProtectedRoute, LoadingSpinner, ErrorMessage
    │   ├── context/             # AuthContext (React Auth State Provider)
    │   ├── pages/               # 13 React Pages (Home, Login, Register, UserDashboard, ParkingSlots, BookParking, BookingConfirmation, BookingHistory, AdminLogin, AdminDashboard, ManageParkingSlots, ManageBookings, ManageUsers)
    │   ├── services/            # api.js (Axios Instance & Services)
    │   ├── index.css            # Glassmorphism Design System
    │   ├── App.jsx              # React Router Navigation Setup
    │   └── main.jsx             # Application Entrypoint
    ├── index.html               # Main HTML Template
    ├── package.json             # Node.js dependencies
    └── vite.config.js           # Vite Server Config (Port 3000)
```

---

## ⚡ Quick Start & Running Guide

### Step 1: Database Setup (MySQL)
Make sure MySQL Server is running on your machine on default port `3306`.
Create the database using MySQL CLI or MySQL Workbench:

```sql
CREATE DATABASE smart_parking;
```

### Step 2: Backend Setup (Spring Boot)
1. Open a terminal in the `backend/` directory:
2. Ensure database credentials in `backend/src/main/resources/application.properties` match your local MySQL installation (`spring.datasource.password=YOUR_PASSWORD`).
3. Compile and start the Spring Boot backend server:

```powershell
# On Windows PowerShell / Command Prompt
.\mvnw.cmd spring-boot:run
```

*The backend will automatically create all MySQL tables and seed 18 sample slots (A1-A6, B1-B6, C1-C6) and default accounts.*

### Step 3: Frontend Setup (React)
1. Open a second terminal in the `frontend/` directory:
2. Install npm dependencies and run the development server:

```powershell
cmd /c npm install
cmd /c npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`.

---

## 🔑 Sample Test Credentials

| Account Role | Email Address | Password | Default Vehicle Number |
|---|---|---|---|
| **Administrator** | `admin@smartparking.com` | `admin123` | `ADMIN-01` |
| **Sample User** | `john@example.com` | `user123` | `KA-01-AB-1234` |

---

## 🎓 Interview Key Concepts

This application is built with clean architectural patterns to demonstrate key engineering concepts during technical interviews:

1. **Object-Oriented Programming (OOP)**: Clear separation of entities, DTOs, interfaces, and encapsulated domain logic.
2. **RESTful API Architecture**: Use of standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`), semantic status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `409 Conflict`), and structured JSON payloads.
3. **Spring Boot & Dependency Injection**: Usage of `@Service`, `@Repository`, `@RestController`, and `@Autowired` for loose coupling.
4. **Spring Data JPA & ORM**: Mapping Java objects to relational MySQL tables using `@Entity`, `@ManyToOne`, and custom repository method queries.
5. **Transactional Business Logic**: Enforcing slot availability checks and atomic status updates within `@Transactional` boundaries to prevent race conditions.
6. **Exception Handling**: Centralized global exception handler (`@ControllerAdvice`) mapping custom exceptions to clean client-facing JSON error responses.
7. **React Component Lifecycle & State**: Use of React `useState`, `useEffect`, `useContext`, custom components, and client-side routing with `react-router-dom`.
8. **Asynchronous API Integration**: Clean API layer using Axios with Promise handling, loading state management, and user feedback.

---

## 🚀 Future Enhancements

- **Online Payment Gateway**: Integration with Razorpay / Stripe for automatic booking fee processing.
- **QR Code Entry**: Generating unique QR codes on booking confirmation for automated gate entry scanning.
- **IoT Sensor Integration**: Live ultrasonic sensor feed for automatic slot status detection (Occupied vs Available).
- **Automatic Number Plate Recognition (ANPR)**: Camera-based license plate recognition at parking entrances.
- **Google Maps Integration**: Navigation to the parking lot facility and indoor floor mapping.
- **SMS & Email Notifications**: Automated booking reminders via Twilio or SendGrid.
