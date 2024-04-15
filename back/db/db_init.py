import sqlalchemy as db
import os
from sqlalchemy.orm import DeclarativeBase, Session
from typing import List

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import ForeignKey


engine = db.create_engine(os.getenv('DB_URL', 'sqlite:///gen_pass.db'),
                          echo=True)
sessions = Session(engine, expire_on_commit=True)


class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = "users"

    telegram_id: Mapped[int] = mapped_column(primary_key=True)
    admin: Mapped[bool]
    fast: Mapped[int] = mapped_column(ForeignKey("passwords.id"))

    passwords: Mapped[List["User_Password"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(telegram_id={self.telegram_id!r}, admin={self.admin!r}, fast={self.fast!r})"


class User_Password(Base):
    __tablename__ = "user_passwords"
    name_pass: Mapped[str]

    users_fk: Mapped[int] = mapped_column(ForeignKey("users.telegram_id"), primary_key=True)
    password_fk: Mapped[int] = mapped_column(ForeignKey("passwords.id"), primary_key=True)

    password: Mapped["Passwords"] = relationship(back_populates="users")
    user: Mapped["Users"] = relationship(back_populates="passwords")

    def __repr__(self) -> str:
        return f"User_Password(name_pass{self.name_pass!r} users_fk={self.users_fk!r},password_fk={self.password_fk!r})"


class Passwords(Base):
    __tablename__ = "passwords"

    id: Mapped[int] = mapped_column(primary_key=True)
    length: Mapped[int] = mapped_column()
    numbers: Mapped[bool]
    uppercase: Mapped[bool]
    lowercase: Mapped[bool]
    symbols: Mapped[bool]
    delimiter: Mapped[bool]
    delimiter_value: Mapped[int]

    users: Mapped[List["User_Password"]] = relationship(back_populates="password")

    def __repr__(self) -> str:
        return f"Passwords(id={self.id!r})"


Base.metadata.create_all(engine)
#https://www.youtube.com/watch?v=cH0immwfykI&ab_channel=PrettyPrinted

# in code
# mark = Users(id=1, telegram_id=1)
# sessions.add(mark)
# sessions.commit()