import sqlalchemy as db
from sqlalchemy.orm import DeclarativeBase, Session
from typing import List
from typing import Optional
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


engine = db.create_engine('sqlite:///gen_pass.db', echo=True)
sessions = Session(engine, expire_on_commit=True)

class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    telegram_id: Mapped[int]

    passwords: Mapped[List["Passwords"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, telegram_id={self.telegram_id!r})"


class Passwords(Base):
    __tablename__ = "passwords"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id = mapped_column(ForeignKey("users.id"))
    length: Mapped[int] = mapped_column()

    user: Mapped[Users] = relationship(back_populates="passwords")
    def __repr__(self) -> str:
        return f"Passwords(id={self.id!r}, email_address={self.email_address!r})"
    
Base.metadata.create_all(engine)
#https://www.youtube.com/watch?v=cH0immwfykI&ab_channel=PrettyPrinted

# in code
# mark = Users(id=1, telegram_id=1)
# sessions.add(mark)
# sessions.commit()