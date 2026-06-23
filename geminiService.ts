import { GoogleGenAI, Type } from "@google/genai";
import { RegionAssessment, AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getRegionalInsights(region: RegionAssessment): Promise<AIInsight> {
  const prompt = `
    As a hospital operations expert, analyze the following department data for "${region.name}":
    - Current Facility Availability:
      - General Beds: ${region.facilities.beds.available}/${region.facilities.beds.total} (Required: ${region.facilities.beds.required})
      - ICU Units: ${region.facilities.icus.available}/${region.facilities.icus.total} (Required: ${region.facilities.icus.required})
      - Vaccines: ${region.facilities.vaccines.available} doses (Required: ${region.facilities.vaccines.required})
      - Oxygen: ${region.facilities.oxygen.available} cylinders (Required: ${region.facilities.oxygen.required})
      - Nurses: ${region.facilities.nurses.available}/${region.facilities.nurses.total} (Required: ${region.facilities.nurses.required})
      - Staff: ${region.facilities.staffMembers.available}/${region.facilities.staffMembers.total} (Required: ${region.facilities.staffMembers.required})
      - Diagnostic Kits: ${region.facilities.diagnosticKits.available} (Required: ${region.facilities.diagnosticKits.required})

    Provide a concise summary of the operational status for this department, specific recommendations for hospital administrators, 
    and a priority list for resource allocation. 
    
    Additionally, predict specific facility requirements that the primary regional hospital needs to obtain from the government.
    
    Also, analyze the nearby hospitals and suggest inter-hospital resource sharing if this hospital has a shortage and others have surplus:
    ${region.nearbyHospitals.map(h => `- ${h.name}: ICU: ${h.icuAvailable}, Oxygen: ${h.oxygenAvailable}, Beds: ${h.bedsAvailable} (Distance: ${h.distance}km)`).join('\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            resourceAllocation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                  reason: { type: Type.STRING }
                },
                required: ["item", "priority", "reason"]
              }
            },
            facilityPredictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  facilityType: { type: Type.STRING },
                  quantityNeeded: { type: Type.STRING },
                  urgency: { type: Type.STRING, enum: ["Critical", "High", "Moderate"] },
                  governmentRequest: { type: Type.STRING },
                  impact: { type: Type.STRING }
                },
                required: ["facilityType", "quantityNeeded", "urgency", "governmentRequest", "impact"]
              }
            }
          },
          required: ["summary", "recommendations", "resourceAllocation", "facilityPredictions"]
        }
      }
    });

    return JSON.parse(response.text || '{}') as AIInsight;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return {
      summary: "Unable to generate AI insights at this time.",
      recommendations: ["Monitor local health reports.", "Maintain standard safety protocols."],
      resourceAllocation: [],
      facilityPredictions: []
    };
  }
}
