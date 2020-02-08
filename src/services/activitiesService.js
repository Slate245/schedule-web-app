export function getActivities() {
  return Promise.resolve({
    data: [
      {
        _id: 1,
        name: "Первое дело",
        preferredInterval: {
          start: "2020-02-06T08:00:00Z",
          end: "2020-02-06T12:00:00Z"
        },
        expectedDuration: 30
      },
      {
        _id: 2,
        name: "Второе дело",
        preferredInterval: {
          start: "2020-02-06T09:00:00Z",
          end: "2020-02-06T12:00:00Z"
        },
        expectedDuration: 45
      },
      {
        _id: 3,
        name: "Третье дело",
        preferredInterval: {
          start: "2020-02-06T13:00:00Z",
          end: "2020-02-06T14:00:00Z"
        },
        expectedDuration: 90
      },
      {
        _id: 4,
        name:
          "Очень-очень длинное дело, в котором есть весьма-весьма-весьма длинная строка",
        preferredInterval: {
          start: "2020-02-06T15:00:00Z",
          end: "2020-02-06T17:00:00Z"
        },
        expectedDuration: 15
      }
    ]
  });
}
