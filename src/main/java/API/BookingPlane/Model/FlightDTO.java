package API.BookingPlane.Model;
import lombok.Data;

@Data
public class FlightDTO {
    private String flightNumber;
    private String airline;
    private String departureAirport;
    private String arrivalAirport;
    private String departureTime;
    private String arrivalTime;
    private String status;
}
