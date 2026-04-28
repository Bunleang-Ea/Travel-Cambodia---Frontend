import { USE_MOCK_ITINERARY } from "../core/apiConfig";
import { httpRequest } from "../core/httpClient";
import {
  createJourneyMock,
  deleteJourneyMock,
  getJourneysMock,
  getJourneyByIdMock,
  updateJourneyMock,
} from "../mock/itineraryMockApi";

export const getJourneys = async ({ sortBy = "recent" } = {}) => {
  if (USE_MOCK_ITINERARY) return getJourneysMock(sortBy);
  return httpRequest("/itineraries/", { query: { sortBy } });
};

export const createJourney = async (payload) => {
  if (USE_MOCK_ITINERARY) return createJourneyMock(payload);
  return httpRequest("/itineraries/", {
    method: "POST",
    body: payload,
  });
};

export const deleteJourney = async (journeyId) => {
  if (USE_MOCK_ITINERARY) return deleteJourneyMock(journeyId);
  return httpRequest(`/itineraries/${journeyId}/`, {
    method: "DELETE",
  });
};

export const getJourneyById = async (journeyId) => {
  if (USE_MOCK_ITINERARY) return getJourneyByIdMock(journeyId);
  return httpRequest(`/itineraries/${journeyId}/`);
};

export const updateJourney = async (journeyId, updates) => {
  if (USE_MOCK_ITINERARY) return updateJourneyMock(journeyId, updates);
  return httpRequest(`/itineraries/${journeyId}/`, {
    method: "PUT",
    body: updates,
  });
};
