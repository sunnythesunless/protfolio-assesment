from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, Literal, List


class ChatMessageItem(BaseModel):
    """Single chat message in conversation history."""

    model_config = ConfigDict(extra="forbid")

    role: Literal["user", "assistant"] = Field(
        ...,
        description="Message role: 'user' or 'assistant'",
    )
    content: str = Field(
        ...,
        min_length=1,
        max_length=4000,
        description="Message content",
    )
    timestamp: Optional[str] = None


class ChatRequest(BaseModel):
    """Incoming chat request payload."""

    model_config = ConfigDict(extra="forbid")

    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="User's question",
    )

    history: List[ChatMessageItem] = Field(
        default_factory=list,
        description="Previous conversation messages",
    )

    @field_validator("message")
    @classmethod
    def message_not_blank(cls, v: str) -> str:
        """Prevent whitespace-only messages."""
        if not v.strip():
            raise ValueError("Message cannot be empty")
        return v.strip()

    @field_validator("history")
    @classmethod
    def limit_history(cls, v: List[ChatMessageItem]) -> List[ChatMessageItem]:
        """Hard cap history length."""
        if len(v) > 50:
            raise ValueError("History too long (max 50 messages)")
        return v


class ChatResponse(BaseModel):
    """Successful AI response."""

    model_config = ConfigDict(extra="forbid")

    response: str = Field(..., description="AI-generated response")
    error: Optional[str] = None


class ErrorResponse(BaseModel):
    """Error response schema."""

    model_config = ConfigDict(extra="forbid")

    error: str = Field(..., description="Error message")