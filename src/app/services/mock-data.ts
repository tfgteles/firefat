import { Game } from '../models/game.model';
import { User } from '../models/user.model';

export const USERS: User[] = [
    { id: 1, userEmail: 'email1@mail.com', firstName: 'player 1', lastName: 'last name', userName: 'Player 1' },
    { id: 2, userEmail: 'email2@mail.com', firstName: 'player 2', lastName: 'last name', userName: 'Player 2' },
    { id: 3, userEmail: 'email3@mail.com', firstName: 'player 3', lastName: 'last name', userName: 'Player 3' }
];

export const GAMES: Game[] = [
    {
        id: 1,
        gameName: 'Taliban 2019',
        adminUserId: 1,
        startDate: new Date('2019/01/15'),
        endDate: new Date('2019/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
    },
    {
        id: 2,
        gameName: 'Taliban 2020',
        adminUserId: 1,
        startDate: new Date('2020/01/15'),
        endDate: new Date('2020/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
    },
    {
        id: 3,
        gameName: 'Taliban 2021',
        adminUserId: 3,
        startDate: new Date('2021/01/15'),
        endDate: new Date('2021/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
    }
];
