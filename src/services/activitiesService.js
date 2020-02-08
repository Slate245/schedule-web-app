export function getActivities() {
  return Promise.resolve({
    data: [
      {
        _id: 1,
        name: "Первое дело",
        preferredTimeslot: {
          begining: "2020-02-06T08:00:00Z",
          end: "2020-02-06T12:00:00Z"
        }
      },
      {
        _id: 2,
        name: "Второе дело",
        preferredTimeslot: {
          begining: "2020-02-06T09:00:00Z",
          end: "2020-02-06T12:00:00Z"
        }
      },
      {
        _id: 3,
        name: "Третье дело",
        preferredTimeslot: {
          begining: "2020-02-06T013:00:00Z",
          end: "2020-02-06T14:00:00Z"
        }
      }
    ]
  });
}
