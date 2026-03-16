import Order "mo:core/Order";
import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Migration "migration";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Include migration to new actor.
(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Beauty Parlour Types
  public type Service = {
    #haircut;
    #facial;
    #manicure;
    #pedicure;
    #bridalMakeup;
    #waxing;
    #hairColoring;
    #hairStyling;
    #massage;
    #threading;
  };

  type AppointmentStatus = {
    #pending;
    #confirmed;
    #cancelled;
    #completed;
  };

  public type TimeSlot = {
    startTime : Time.Time;
    endTime : Time.Time;
  };

  public type Appointment = {
    customerName : Text;
    phone : Text;
    service : Service;
    date : Time.Time;
    timeSlot : TimeSlot;
    status : AppointmentStatus;
  };

  public type Testimonial = {
    name : Text;
    rating : Nat;
    comment : Text;
  };

  let appointments = Map.empty<Text, Appointment>();
  let testimonials = List.empty<Testimonial>();

  type AppointmentForm = {
    customerName : Text;
    phone : Text;
    service : Service;
    date : Time.Time;
    timeSlot : TimeSlot;
  };

  // Public can submit appointments (no auth required)
  public shared ({ caller }) func submitAppointment(form : AppointmentForm) : async () {
    appointments.add(
      form.customerName,
      {
        form with
        status = #pending;
      },
    );
  };

  // Admin-only: View all appointments
  public query ({ caller }) func getAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view appointments");
    };
    appointments.values().toArray();
  };

  // Admin-only: Update appointment status
  public shared ({ caller }) func updateAppointmentStatus(customerName : Text, status : AppointmentStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update appointment status");
    };
    switch (appointments.get(customerName)) {
      case (null) { Runtime.trap("Appointment not found! (should not happen).") };
      case (?appointment) {
        appointments.add(customerName, { appointment with status });
      };
    };
  };

  // Public can submit testimonials (no auth required)
  public shared ({ caller }) func submitTestimonial(testimonial : Testimonial) : async () {
    testimonials.add(testimonial);
  };

  // Public can view testimonials (no auth required)
  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };
};
