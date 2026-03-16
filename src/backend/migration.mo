import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type OlderActor = {
    rooms : Map.Map<Nat, Room>;
    inquiryForms : List.List<ContactForm>;
  };

  type ContactForm = {
    name : Text;
    phone : Text;
    message : Text;
  };

  type RoomType = { #ac; #nonAc };

  type Room = {
    id : Nat;
    roomType : RoomType;
    price : Nat;
    isAvailable : Bool;
  };

  public func run(_old : OlderActor) : {} {
    {};
  };
};
