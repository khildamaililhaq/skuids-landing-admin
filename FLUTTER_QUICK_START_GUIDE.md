# Ekacita Agent Flutter App - Quick Start Guide

## AI Agent Development Guidance

This guide provides step-by-step instructions for AI agents/developers to build the Ekacita Agent Flutter mobile application.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Architecture Overview](#architecture-overview)
3. [Development Workflow](#development-workflow)
4. [Key Components](#key-components)
5. [Implementation Priority](#implementation-priority)
6. [Testing Guidelines](#testing-guidelines)

---

## Project Setup

### Initial Project Creation

```bash
# Create new Flutter project
flutter create ekacita_agent --org com.ekacita.agent

# Navigate to project
cd ekacita_agent

# Get dependencies
flutter pub get
```

### Configure pubspec.yaml

Add the dependencies listed in the main documentation to `pubspec.yaml`.

```bash
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

### Environment Configuration

Create `.env` file in project root:

```
# API Configuration
API_BASE_URL=https://api.ekacita.live/v1
API_TIMEOUT=30000

# Firebase
FIREBASE_WEB_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASHLYTICS=true
ENABLE_OFFLINE_MODE=true

# App Configuration
APP_NAME=Ekacita Agent
APP_VERSION=1.0.0
MIN_ANDROID_VERSION=21
```

### Project Structure Setup

```bash
# Create directory structure
mkdir -p lib/core/network
mkdir -p lib/core/storage
mkdir -p lib/core/services
mkdir -p lib/core/utils
mkdir -p lib/data/models
mkdir -p lib/data/datasources
mkdir -p lib/data/repositories
mkdir -p lib/domain/entities
mkdir -p lib/domain/usecases
mkdir -p lib/domain/repositories
mkdir -p lib/presentation/pages/{auth,dashboard,hosts,earnings,profile}
mkdir -p lib/presentation/widgets/{common,forms,dashboard}
mkdir -p lib/presentation/providers
mkdir -p lib/presentation/theme
mkdir -p lib/routes
mkdir -p assets/{images,icons,animations,translations}
```

---

## Architecture Overview

### Clean Architecture Layers

```
┌─────────────────────────────────────┐
│      Presentation Layer (UI)        │
│   Pages, Widgets, Providers, Theme  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Domain Layer (Business)       │
│   Entities, UseCases, Repositories  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│        Data Layer (Storage)         │
│   Models, DataSources, Repositories │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Core Layer (Infrastructure)   │
│   Network, Storage, Services, Utils │
└─────────────────────────────────────┘
```

### Design Patterns Used

1. **Provider Pattern** - State management
2. **Repository Pattern** - Data abstraction
3. **Singleton Pattern** - Services and managers
4. **Factory Pattern** - Object creation
5. **Observer Pattern** - Change notifications

---

## Development Workflow

### Phase 1: Core Infrastructure (Week 1)

#### Task 1.1: Setup Network Layer

**File:** `lib/core/network/api_client.dart`

```dart
import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiClient {
  late Dio _dio;
  static const String _timeout = '30000';

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: dotenv.env['API_BASE_URL'] ?? 'https://api.ekacita.live/v1',
      connectTimeout: Duration(milliseconds: int.parse(_timeout)),
      receiveTimeout: Duration(milliseconds: int.parse(_timeout)),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ));

    // Add interceptors
    _dio.interceptors.add(AuthInterceptor());
    _dio.interceptors.add(LoggingInterceptor());
  }

  Future<T> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await _dio.get(
        path,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<T> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<T> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<T> delete<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        queryParameters: queryParameters,
        options: options,
      );
      return response.data;
    } catch (e) {
      rethrow;
    }
  }
}
```

#### Task 1.2: Setup Local Storage

**File:** `lib/core/storage/local_storage.dart`

```dart
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage {
  static final LocalStorage _instance = LocalStorage._internal();
  late SharedPreferences _prefs;

  factory LocalStorage() {
    return _instance;
  }

  LocalStorage._internal();

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  Future<void> setString(String key, String value) =>
      _prefs.setString(key, value);

  String? getString(String key) => _prefs.getString(key);

  Future<void> setInt(String key, int value) => _prefs.setInt(key, value);

  int? getInt(String key) => _prefs.getInt(key);

  Future<void> setBool(String key, bool value) =>
      _prefs.setBool(key, value);

  bool? getBool(String key) => _prefs.getBool(key);

  Future<void> remove(String key) => _prefs.remove(key);

  Future<void> clear() => _prefs.clear();
}
```

#### Task 1.3: Setup Authentication Service

**File:** `lib/core/services/auth_service.dart`

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthService {
  static final AuthService _instance = AuthService._internal();
  final _secureStorage = const FlutterSecureStorage();

  factory AuthService() {
    return _instance;
  }

  AuthService._internal();

  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';

  Future<void> saveTokens(String accessToken, String refreshToken) async {
    await _secureStorage.write(key: _accessTokenKey, value: accessToken);
    await _secureStorage.write(key: _refreshTokenKey, value: refreshToken);
  }

  Future<String?> getAccessToken() =>
      _secureStorage.read(key: _accessTokenKey);

  Future<String?> getRefreshToken() =>
      _secureStorage.read(key: _refreshTokenKey);

  Future<void> clearTokens() async {
    await _secureStorage.delete(key: _accessTokenKey);
    await _secureStorage.delete(key: _refreshTokenKey);
  }

  Future<bool> isTokenValid(String token) async {
    try {
      return !JwtDecoder.isExpired(token);
    } catch (e) {
      return false;
    }
  }
}
```

### Phase 2: Models & Data Layer (Week 2)

#### Task 2.1: Create Data Models

**File:** `lib/data/models/agent_model.dart`

```dart
import 'package:json_annotation/json_annotation.dart';

part 'agent_model.g.dart';

@JsonSerializable()
class AgentModel {
  @JsonKey(name: 'agentId')
  final String id;
  final String fullName;
  final String email;
  final String phone;
  final String? profileImage;
  final String? bio;
  final String status;
  final int totalHosts;
  final double totalEarnings;
  final double monthlyEarnings;
  final double commissionRate;
  final BankAccountModel? bankAccount;
  final bool identityVerified;
  final bool bankVerified;
  final DateTime createdAt;
  final DateTime updatedAt;

  AgentModel({
    required this.id,
    required this.fullName,
    required this.email,
    required this.phone,
    this.profileImage,
    this.bio,
    required this.status,
    required this.totalHosts,
    required this.totalEarnings,
    required this.monthlyEarnings,
    required this.commissionRate,
    this.bankAccount,
    required this.identityVerified,
    required this.bankVerified,
    required this.createdAt,
    required this.updatedAt,
  });

  factory AgentModel.fromJson(Map<String, dynamic> json) =>
      _$AgentModelFromJson(json);

  Map<String, dynamic> toJson() => _$AgentModelToJson(this);
}

@JsonSerializable()
class BankAccountModel {
  final String accountName;
  final String accountNumber;
  final String bankName;

  BankAccountModel({
    required this.accountName,
    required this.accountNumber,
    required this.bankName,
  });

  factory BankAccountModel.fromJson(Map<String, dynamic> json) =>
      _$BankAccountModelFromJson(json);

  Map<String, dynamic> toJson() => _$BankAccountModelToJson(this);
}
```

#### Task 2.2: Create Remote Data Source

**File:** `lib/data/datasources/auth_remote_datasource.dart`

```dart
import 'package:ekacita_agent/core/network/api_client.dart';

class AuthRemoteDataSource {
  final ApiClient _apiClient;

  AuthRemoteDataSource(this._apiClient);

  Future<Map<String, dynamic>> registerAgent({
    required String fullName,
    required String email,
    required String phone,
    required String password,
    required String confirmPassword,
    required bool agreeToTerms,
    String? referralCode,
  }) async {
    final response = await _apiClient.post(
      '/auth/register-agent',
      data: {
        'fullName': fullName,
        'email': email,
        'phone': phone,
        'password': password,
        'confirmPassword': confirmPassword,
        'agreeToTerms': agreeToTerms,
        if (referralCode != null) 'referralCode': referralCode,
      },
    );
    return response;
  }

  Future<Map<String, dynamic>> verifyEmail({
    required String email,
    required String otp,
  }) async {
    final response = await _apiClient.post(
      '/auth/verify-email',
      data: {
        'email': email,
        'otp': otp,
      },
    );
    return response;
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final response = await _apiClient.post(
      '/auth/login',
      data: {
        'email': email,
        'password': password,
      },
    );
    return response;
  }

  Future<Map<String, dynamic>> refreshToken() async {
    final response = await _apiClient.post('/auth/refresh');
    return response;
  }

  Future<void> logout() async {
    await _apiClient.post('/auth/logout');
  }
}
```

### Phase 3: Domain & Business Logic (Week 3)

#### Task 3.1: Create Entities

**File:** `lib/domain/entities/agent_entity.dart`

```dart
class AgentEntity {
  final String id;
  final String fullName;
  final String email;
  final String phone;
  final String? profileImage;
  final String? bio;
  final String status;
  final int totalHosts;
  final double totalEarnings;
  final double monthlyEarnings;
  final double commissionRate;
  final BankAccountEntity? bankAccount;
  final bool identityVerified;
  final bool bankVerified;
  final DateTime createdAt;
  final DateTime updatedAt;

  AgentEntity({
    required this.id,
    required this.fullName,
    required this.email,
    required this.phone,
    this.profileImage,
    this.bio,
    required this.status,
    required this.totalHosts,
    required this.totalEarnings,
    required this.monthlyEarnings,
    required this.commissionRate,
    this.bankAccount,
    required this.identityVerified,
    required this.bankVerified,
    required this.createdAt,
    required this.updatedAt,
  });
}

class BankAccountEntity {
  final String accountName;
  final String accountNumber;
  final String bankName;

  BankAccountEntity({
    required this.accountName,
    required this.accountNumber,
    required this.bankName,
  });
}
```

#### Task 3.2: Create Use Cases

**File:** `lib/domain/usecases/login_usecase.dart`

```dart
import 'package:dartz/dartz.dart';
import 'package:ekacita_agent/domain/entities/agent_entity.dart';

abstract class AuthRepository {
  Future<Either<Exception, Map<String, dynamic>>> login({
    required String email,
    required String password,
  });
}

class LoginUseCase {
  final AuthRepository repository;

  LoginUseCase(this.repository);

  Future<Either<Exception, Map<String, dynamic>>> call({
    required String email,
    required String password,
  }) async {
    return await repository.login(email: email, password: password);
  }
}
```

### Phase 4: Presentation Layer (Week 4)

#### Task 4.1: Create Theme Configuration

**File:** `lib/presentation/theme/app_colors.dart`

```dart
import 'package:flutter/material.dart';

class AppColors {
  // Primary Colors
  static const Color primary = Color(0xFFCFAA0A);
  static const Color primaryLight = Color(0xFFF7D96F);
  static const Color primaryDark = Color(0xFF8D7200);
  static const Color primaryOnColor = Color(0xFFFFFFFF);

  // Secondary Colors
  static const Color secondary = Color(0xFF8E7629);
  static const Color secondaryLight = Color(0xFFE0C276);
  static const Color secondaryDark = Color(0xFF594700);
  static const Color secondaryOnColor = Color(0xFFFFFFFF);

  // Tertiary Colors
  static const Color tertiary = Color(0xFF009A98);
  static const Color tertiaryLight = Color(0xFF67D0CE);
  static const Color tertiaryDark = Color(0xFF004F4C);
  static const Color tertiaryOnColor = Color(0xFFFFFFFF);

  // Backgrounds
  static const Color background = Color(0xFFFFFCF5);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF6F6EC);

  // Text Colors
  static const Color textPrimary = Color(0xFF1A1A15);
  static const Color textSecondary = Color(0xFF47473F);
  static const Color textTertiary = Color(0xFF77776D);

  // Status Colors
  static const Color success = Color(0xFF009A98);
  static const Color error = Color(0xFFB3261E);
  static const Color warning = Color(0xFFFFA500);
  static const Color info = Color(0xFF0066CC);

  // Neutral Palette
  static const Map<int, Color> neutral = {
    10: Color(0xFF1A1A15),
    20: Color(0xFF2F2F2A),
    30: Color(0xFF47473F),
    40: Color(0xFF5F5F56),
    50: Color(0xFF77776D),
    60: Color(0xFF909086),
    70: Color(0xFFAAAA9F),
    80: Color(0xFFC5C5BA),
    90: Color(0xFFE2E2D7),
    95: Color(0xFFF6F6EC),
  };
}
```

#### Task 4.2: Create App Theme

**File:** `lib/presentation/theme/app_themes.dart`

```dart
import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppThemes {
  static ThemeData getLightTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        tertiary: AppColors.tertiary,
        background: AppColors.background,
        surface: AppColors.surface,
        error: AppColors.error,
      ),
      scaffoldBackgroundColor: AppColors.background,
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.surface,
        elevation: 0,
        centerTitle: true,
        iconTheme: const IconThemeData(color: AppColors.textPrimary),
        titleTextStyle: const TextStyle(
          color: AppColors.textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: Colors.white,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: 24,
            vertical: 12,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.surface,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.surfaceVariant),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
      ),
    );
  }

  static ThemeData getDarkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      // ... implement dark theme
    );
  }
}
```

#### Task 4.3: Create Main App Providers

**File:** `lib/presentation/providers/auth_provider.dart`

```dart
import 'package:flutter/material.dart';
import 'package:ekacita_agent/domain/entities/agent_entity.dart';

class AuthProvider with ChangeNotifier {
  AgentEntity? _agent;
  String? _accessToken;
  bool _isLoading = false;
  String? _error;

  AgentEntity? get agent => _agent;
  String? get accessToken => _accessToken;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _accessToken != null;

  Future<bool> login({
    required String email,
    required String password,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // Call login API
      // Parse response
      // Save tokens
      // Update state
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    _agent = null;
    _accessToken = null;
    _error = null;
    notifyListeners();
  }
}
```

#### Task 4.4: Create Login Page

**File:** `lib/presentation/pages/auth/login_page.dart`

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ekacita_agent/presentation/providers/auth_provider.dart';
import 'package:ekacita_agent/presentation/theme/app_colors.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _login() async {
    if (_formKey.currentState!.validate()) {
      final authProvider = context.read<AuthProvider>();
      final success = await authProvider.login(
        email: _emailController.text,
        password: _passwordController.text,
      );

      if (success && mounted) {
        // Navigate to dashboard
        Navigator.of(context).pushReplacementNamed('/dashboard');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 48),
                // Logo or title
                const Text(
                  'Ekacita Agent',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 48),
                // Email field
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    hintText: 'Email',
                    prefixIcon: Icon(Icons.email),
                  ),
                  validator: (value) {
                    if (value?.isEmpty ?? true) {
                      return 'Email is required';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                // Password field
                TextFormField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(
                    hintText: 'Password',
                    prefixIcon: Icon(Icons.lock),
                  ),
                  validator: (value) {
                    if (value?.isEmpty ?? true) {
                      return 'Password is required';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),
                // Login button
                Consumer<AuthProvider>(
                  builder: (context, authProvider, _) {
                    return ElevatedButton(
                      onPressed: authProvider.isLoading ? null : _login,
                      child: authProvider.isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                              ),
                            )
                          : const Text('Login'),
                    );
                  },
                ),
                const SizedBox(height: 24),
                // Error message
                Consumer<AuthProvider>(
                  builder: (context, authProvider, _) {
                    if (authProvider.error != null) {
                      return Text(
                        authProvider.error!,
                        style: const TextStyle(color: AppColors.error),
                        textAlign: TextAlign.center,
                      );
                    }
                    return const SizedBox.shrink();
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

### Phase 5: Main App & Routing (Week 5)

#### Task 5.1: Create App Routes

**File:** `lib/routes/app_routes.dart`

```dart
class AppRoutes {
  static const String splash = '/splash';
  static const String login = '/login';
  static const String register = '/register';
  static const String verifyOtp = '/verify-otp';
  static const String dashboard = '/dashboard';
  static const String hosts = '/hosts';
  static const String hostDetail = '/host-detail';
  static const String earnings = '/earnings';
  static const String profile = '/profile';
  static const String settings = '/settings';

  static const String initialRoute = splash;
}
```

#### Task 5.2: Create Main App

**File:** `lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:ekacita_agent/core/storage/local_storage.dart';
import 'package:ekacita_agent/presentation/providers/auth_provider.dart';
import 'package:ekacita_agent/presentation/theme/app_themes.dart';
import 'package:ekacita_agent/routes/app_routes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize environment
  await dotenv.load();

  // Initialize local storage
  final localStorage = LocalStorage();
  await localStorage.init();

  // Initialize translations
  await EasyLocalization.ensureInitialized();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        // Add other providers
      ],
      child: MaterialApp(
        localizationsDelegates: context.localizationDelegates,
        supportedLocales: context.supportedLocales,
        locale: context.locale,
        title: 'Ekacita Agent',
        debugShowCheckedModeBanner: false,
        theme: AppThemes.getLightTheme(),
        darkTheme: AppThemes.getDarkTheme(),
        themeMode: ThemeMode.system,
        home: const SplashPage(),
        routes: {
          AppRoutes.login: (context) => const LoginPage(),
          AppRoutes.dashboard: (context) => const DashboardPage(),
          // Add other routes
        },
      ),
    );
  }
}
```

---

## Key Components

### 1. Authentication Flow

```
User Registration
    ↓
Email/Phone Verification
    ↓
Login
    ↓
Obtain JWT Token
    ↓
Access Dashboard
```

### 2. Data Flow

```
API Response → Model → Entity → Provider → UI
```

### 3. State Management

Use `ChangeNotifier` + `Provider` for simple, predictable state management.

### 4. Error Handling

```dart
try {
  // API call
} on DioException catch (e) {
  // Network error
} on FormatException catch (e) {
  // JSON parsing error
} catch (e) {
  // Generic error
}
```

---

## Implementation Priority

### Priority 1 (MVP)
- [ ] Authentication (Register, Login, Logout)
- [ ] Dashboard with basic stats
- [ ] View recruited hosts list
- [ ] View earnings summary
- [ ] User profile
- [ ] Notifications

### Priority 2 (Core Features)
- [ ] Host details and contact
- [ ] Withdrawal requests
- [ ] Referral program
- [ ] Marketing assets
- [ ] Settings and preferences

### Priority 3 (Enhancement)
- [ ] Analytics and reports
- [ ] Support tickets
- [ ] Offline mode
- [ ] Advanced filtering
- [ ] Data export

### Priority 4 (Polish)
- [ ] Performance optimization
- [ ] Additional animations
- [ ] Theme customization
- [ ] Advanced analytics
- [ ] A/B testing

---

## Testing Guidelines

### Unit Tests

```dart
// Test user repository
test('should return agent when login is successful', () async {
  // Setup
  final mockApiClient = MockApiClient();
  when(mockApiClient.post('/auth/login')).thenAnswer(
    (_) async => {'success': true, 'data': {...}},
  );

  // Execute
  final result = await authRepository.login(
    email: 'test@example.com',
    password: 'password123',
  );

  // Verify
  expect(result, isA<Right>());
});
```

### Widget Tests

```dart
testWidgets('should display login form', (WidgetTester tester) async {
  await tester.pumpWidget(const MyApp());

  expect(find.byType(TextFormField), findsWidgets);
  expect(find.byType(ElevatedButton), findsOneWidget);
});
```

### Integration Tests

```dart
testWidgets('complete login flow', (WidgetTester tester) async {
  // Run the app
  app.main();
  await tester.pumpAndSettle();

  // Enter credentials
  await tester.enterText(find.byType(TextField).first, 'test@example.com');
  await tester.enterText(find.byType(TextField).last, 'password123');

  // Tap login
  await tester.tap(find.byType(ElevatedButton));
  await tester.pumpAndSettle();

  // Verify dashboard is shown
  expect(find.byType(DashboardPage), findsOneWidget);
});
```

---

## Common Development Tasks

### Adding a New Feature

1. Create entity in `domain/entities/`
2. Create model in `data/models/`
3. Add API methods in `data/datasources/`
4. Create repository in `data/repositories/`
5. Create use case in `domain/usecases/`
6. Create provider in `presentation/providers/`
7. Create UI pages/widgets in `presentation/`

### Adding a New API Endpoint

1. Add method to `ApiClient`
2. Add method to remote data source
3. Add method to repository
4. Create use case
5. Use in provider
6. Display in UI

### Debugging

```bash
# Enable verbose logging
flutter run -v

# Connect to physical device
flutter devices
flutter run -d <device_id>

# Debug in VS Code
# Set breakpoints and use Debug tab
```

---

## Performance Tips

1. Use `const` constructors
2. Implement `shouldRebuild` in providers
3. Use `ListView.builder` for long lists
4. Cache images with `cached_network_image`
5. Lazy load data
6. Use `RepaintBoundary` for complex widgets
7. Profile with DevTools

---

## Deployment Checklist

Before releasing to Google Play Store:

- [ ] Update version in `pubspec.yaml`
- [ ] Update app signing configuration
- [ ] Run all tests
- [ ] Remove debug logging
- [ ] Test on multiple devices
- [ ] Create screenshots and descriptions
- [ ] Set up app store listing
- [ ] Build release APK/Bundle
- [ ] Submit for review

---

## Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Packages](https://pub.dev)
- [Material Design 3](https://m3.material.io)
- [Provider Package](https://pub.dev/packages/provider)
- [Dio HTTP Client](https://pub.dev/packages/dio)
- [Firebase Documentation](https://firebase.google.com/docs)

---

## Support

For questions or issues:
- **Email:** dev-support@ekacita.live
- **Slack:** #flutter-development
- **GitHub Issues:** github.com/ekacita/ekacita-agent-flutter/issues

