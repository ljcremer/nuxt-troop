import { defineStore } from "pinia";

export const useTemplatesStore = defineStore({
  id: "template-store",
  state: () => {
    return {
      templateList: [
        {
          id: 1,
          name: "Template 1",
          description: "Template 1 description",
          duration: "4 Days",
          capacity: {
            min: 1,
            max: 10,
          },
          localExpert: {
            id: 1,
            name: "Local Expert 1",
            description: "Local Expert 1 description",
            specialities: ["corporate", "teambuilding"],
          },
          itineraryItems: [
            {
              id: 1,
              name: "Item 1",
              position: 1,
              type: "airport",
              value: "LHR",
              location: { lat: 1.0, lon: 1.0 },
              period: {
                startTime: "2020-01-01T00:00:00.000Z",
                endTime: "2020-01-01T00:00:00.000Z",
              },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 2,
              name: "Item 2",
              position: 2,
              type: "transfer",
              startLocation: { lat: 1.0, lon: 1.0 },
              endLocation: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 3,
              name: "Item 3",
              position: 3,
              type: "hotel",
              location: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 4,
              name: "Item 2",
              position: 4,
              type: "transfer",
              startLocation: { lat: 1.0, lon: 1.0 },
              endLocation: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 5,
              name: "Item 4",
              position: 5,
              type: "airport",
              value: "LHR",
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 6,
              name: "Item 5",
              position: 6,
              type: "hotel",
              location: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
          ],
          //List of 5 bookmarks
          bookmarks: [
            {
              id: 1,
              parent: 3,
              name: "Bookmark 1",
              position: 1,
              type: "Restaurant",
              value: "LHR",
              location: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 2,
              parent: 3,
              name: "Bookmark 2",
              position: 2,
              type: "Restaurant",
              startLocation: { lat: 1.0, lon: 1.0 },
              endLocation: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 3,
              parent: 3,
              name: "Bookmark 3",
              position: 3,
              type: "Workspace",
              location: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 4,
              parent: 3,
              name: "Bookmark 4",
              position: 4,
              type: "Office",
              startLocation: { lat: 1.0, lon: 1.0 },
              endLocation: { lat: 1.0, lon: 1.0 },
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
            {
              id: 5,
              parent: 3,
              name: "Bookmark 5",
              position: 5,
              type: "Workspace",
              value: "LHR",
              price: {
                high: 1.0,
                low: 1.0,
              },
            },
          ],
          //List of 5 gifts with id, name, position, description, price, url
          gifts: [
            {
              id: 1,
              name: "Gift 1",
              position: 1,
              description: "Gift 1 description",
              price: {
                high: 1.0,
                low: 1.0,
              },
              url: "https://www.example.com",
            },
            {
              id: 2,
              name: "Gift 2",
              position: 2,
              description: "Gift 2 description",
              price: {
                high: 1.0,
                low: 1.0,
              },
              url: "https://www.example.com",
            },
            {
              id: 3,
              name: "Gift 3",
              position: 3,
              description: "Gift 3 description",
              price: {
                high: 1.0,
                low: 1.0,
              },
              url: "https://www.example.com",
            },
            {
              id: 4,
              name: "Gift 4",
              position: 4,
              description: "Gift 4 description",
              price: {
                high: 1.0,
                low: 1.0,
              },
              url: "https://www.example.com",
            },
            {
              id: 5,
              name: "Gift 5",
              position: 5,
              description: "Gift 5 description",
              price: {
                high: 1.0,
                low: 1.0,
              },
              url: "https://www.example.com",
            },
          ],
        },
      ],
    };
  },
  actions: {},
  getters: {
    getTemplatesList: (state) => state.templateList,
  },
});
