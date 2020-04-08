export function getActivities(user) {
  // return Promise.resolve({ data: [] });
  return Promise.resolve({
    data: [
      {
        _id: 1,
        name: "Первое дело",
        preferredInterval: {
          start: "08:00:00Z",
          end: "12:00:00Z",
        },
        expectedDuration: 30,
      },
      {
        _id: 2,
        name: "Второе дело",
        preferredInterval: {
          start: "09:00:00Z",
          end: "12:00:00Z",
        },
        expectedDuration: 45,
      },
      {
        _id: 3,
        name: "Третье дело",
        preferredInterval: {
          start: "13:00:00Z",
          end: "14:00:00Z",
        },
        expectedDuration: 90,
      },
      {
        _id: 4,
        name:
          "Очень-очень длинное дело, в котором есть весьма-весьма-весьма длинная строка",
        preferredInterval: {
          start: "15:00:00Z",
          end: "17:00:00Z",
        },
        expectedDuration: 15,
      },
    ],
  });
}
