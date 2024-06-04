from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to access it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsSelf(permissions.BasePermission):
    """
    Custom permission to allow users to only view their own user object
    """

    def has_object_permission(self, request, view, obj):
        return obj == request.user
