export class User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  profilePicture: string;
  createdAt: Date;
  agendaItems: AgendaItem[];
  financialItems: FinancialItem[];
  activities: Activity[];
  categoriesCreated: Category[];

  constructor(
    id: string,
    name: string,
    email: string,
    passwordHash: string,
    profilePicture: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt;
    this.agendaItems = [];
    this.financialItems = [];
    this.activities = [];
    this.categoriesCreated = [];
  }
}

export class Category {
  id: string;
  name: string;
  hexColor: string;
  moduleType: string;

  constructor(id: string, name: string, hexColor: string, moduleType: string) {
    this.id = id;
    this.name = name;
    this.hexColor = hexColor;
    this.moduleType = moduleType;
  }
}

export abstract class AgendaItem {
  id: string;
  title: string;
  description: string;

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

export class Task extends AgendaItem {
  dueDate: Date;
  priority: string;
  isCompleted: boolean;
  category: Category | null;

  constructor(
    id: string,
    title: string,
    description: string,
    dueDate: Date,
    priority: string,
    isCompleted: boolean,
    category: Category | null = null,
  ) {
    super(id, title, description);
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.category = category;
  }
}

export class Event extends AgendaItem {
  startDate: Date;
  endDate: Date;
  googleEventId: string;

  constructor(
    id: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    googleEventId: string,
  ) {
    super(id, title, description);
    this.startDate = startDate;
    this.endDate = endDate;
    this.googleEventId = googleEventId;
  }
}

export abstract class FinancialItem {
  id: string;
  amount: number;

  constructor(id: string, amount: number) {
    this.id = id;
    this.amount = amount;
  }
}

export class Transaction extends FinancialItem {
  transactionType: string;
  date: Date;
  description: string;
  category: Category | null;

  constructor(
    id: string,
    amount: number,
    transactionType: string,
    date: Date,
    description: string,
    category: Category | null = null,
  ) {
    super(id, amount);
    this.transactionType = transactionType;
    this.date = date;
    this.description = description;
    this.category = category;
  }
}

export class Goal extends FinancialItem {
  title: string;
  targetAmount: number;
  targetDate: Date;

  constructor(id: string, amount: number, title: string, targetAmount: number, targetDate: Date) {
    super(id, amount);
    this.title = title;
    this.targetAmount = targetAmount;
    this.targetDate = targetDate;
  }
}

export class Investment extends FinancialItem {
  assetName: string;
  estimatedReturn: number;

  constructor(id: string, amount: number, assetName: string, estimatedReturn: number) {
    super(id, amount);
    this.assetName = assetName;
    this.estimatedReturn = estimatedReturn;
  }
}

export abstract class Activity {
  id: string;
  name: string;
  description: string;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export class HabitModule extends Activity {
  notes: string;
  currentStreak: number;
  dailyRecords: DailyRecord[];

  constructor(id: string, name: string, description: string, notes: string, currentStreak: number) {
    super(id, name, description);
    this.notes = notes;
    this.currentStreak = currentStreak;
    this.dailyRecords = [];
  }
}

export class DailyRecord {
  id: string;
  date: Date;
  isCompleted: boolean;

  constructor(id: string, date: Date, isCompleted: boolean) {
    this.id = id;
    this.date = date;
    this.isCompleted = isCompleted;
  }
}